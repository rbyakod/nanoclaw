#!/usr/bin/env node
/**
 * NanoClaw Dashboard — interactive terminal dashboard
 * Usage: node dashboard.js
 */
import Database from 'better-sqlite3';
import { execSync } from 'child_process';
import { existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'store/messages.db');
const LOGS_DIR = join(__dirname, 'logs');
const GROUPS_DIR = join(__dirname, 'groups');
const REFRESH_MS = 3000;

// ─── ANSI helpers ────────────────────────────────────────────────────────────

const C = {
  reset:   '\x1b[0m',
  bold:    '\x1b[1m',
  dim:     '\x1b[2m',
  red:     '\x1b[31m',
  green:   '\x1b[32m',
  yellow:  '\x1b[33m',
  blue:    '\x1b[34m',
  cyan:    '\x1b[36m',
  white:   '\x1b[37m',
  gray:    '\x1b[90m',
  bgGreen: '\x1b[42m',
  bgRed:   '\x1b[41m',
};

const W = () => process.stdout.columns || 100;
const out = (s) => process.stdout.write(s);
const line = (s = '') => out(s + '\n');
const ruler = (ch = '─') => line(C.dim + ch.repeat(W()) + C.reset);
const pad = (s, n, right = false) => {
  const str = String(s ?? '');
  const diff = Math.max(0, n - visibleLen(str));
  return right ? ' '.repeat(diff) + str : str + ' '.repeat(diff);
};

// Strip ANSI codes to get visible character length
const ANSI_RE = /\x1b\[[0-9;]*m/g;
const visibleLen = (s) => String(s).replace(ANSI_RE, '').length;

const color = (text, ...codes) => codes.join('') + text + C.reset;
const bold  = (t) => color(t, C.bold);
const dim   = (t) => color(t, C.dim);
const green = (t) => color(t, C.green);
const red   = (t) => color(t, C.red);
const yellow= (t) => color(t, C.yellow);
const cyan  = (t) => color(t, C.cyan);
const gray  = (t) => color(t, C.gray);

function header(title) {
  const w = W();
  const inner = ` ${title} `;
  const side = Math.floor((w - inner.length) / 2);
  line(C.bold + C.cyan + '─'.repeat(side) + inner + '─'.repeat(w - side - inner.length) + C.reset);
}

function section(title) {
  line('');
  line(C.bold + C.white + ' ' + title + C.reset);
  line(C.dim + ' ' + '─'.repeat(W() - 2) + C.reset);
}

function relativeTime(isoStr) {
  if (!isoStr) return dim('never');
  const diff = Date.now() - new Date(isoStr).getTime();
  if (isNaN(diff)) return dim('—');
  if (diff < 60_000)         return green(`${Math.floor(diff / 1000)}s ago`);
  if (diff < 3_600_000)      return yellow(`${Math.floor(diff / 60_000)}m ago`);
  if (diff < 86_400_000)     return `${Math.floor(diff / 3_600_000)}h ago`;
  return gray(`${Math.floor(diff / 86_400_000)}d ago`);
}

function formatNext(isoStr) {
  if (!isoStr) return dim('—');
  const diff = new Date(isoStr).getTime() - Date.now();
  if (isNaN(diff)) return dim('—');
  if (diff < 0)              return yellow('overdue');
  if (diff < 60_000)         return green(`in ${Math.floor(diff / 1000)}s`);
  if (diff < 3_600_000)      return `in ${Math.floor(diff / 60_000)}m`;
  if (diff < 86_400_000)     return `in ${Math.floor(diff / 3_600_000)}h`;
  return `in ${Math.floor(diff / 86_400_000)}d`;
}

function truncate(s, n) {
  if (!s) return '';
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function bar(pct, width = 20) {
  const filled = Math.round((pct / 100) * width);
  return green('█'.repeat(filled)) + dim('░'.repeat(width - filled));
}

// ─── Data fetchers ────────────────────────────────────────────────────────────

function isRunning() {
  try {
    execSync('launchctl list com.nanoclaw', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function openDb() {
  if (!existsSync(DB_PATH)) return null;
  try {
    return new Database(DB_PATH, { readonly: true, fileMustExist: true });
  } catch {
    return null;
  }
}

function fetchGroups(db) {
  return db.prepare(`
    SELECT rg.jid, rg.name, rg.folder, rg.added_at,
           c.last_message_time,
           (SELECT COUNT(*) FROM messages m WHERE m.chat_jid = rg.jid) AS msg_count,
           (SELECT COUNT(*) FROM messages m WHERE m.chat_jid = rg.jid AND m.is_bot_message = 1) AS bot_count
    FROM registered_groups rg
    LEFT JOIN chats c ON c.jid = rg.jid
    ORDER BY c.last_message_time DESC NULLS LAST
  `).all();
}

function fetchRecentMessages(db, limit = 8) {
  return db.prepare(`
    SELECT m.chat_jid, m.sender_name, m.content, m.timestamp, m.is_bot_message,
           c.name AS chat_name
    FROM messages m
    LEFT JOIN chats c ON c.jid = m.chat_jid
    ORDER BY m.timestamp DESC
    LIMIT ?
  `).all(limit);
}

function fetchTasks(db) {
  return db.prepare(`
    SELECT t.*,
           (SELECT COUNT(*) FROM task_run_logs l WHERE l.task_id = t.id) AS run_count,
           (SELECT COUNT(*) FROM task_run_logs l WHERE l.task_id = t.id AND l.status = 'success') AS success_count,
           (SELECT AVG(l.duration_ms) FROM task_run_logs l WHERE l.task_id = t.id) AS avg_duration_ms
    FROM scheduled_tasks t
    ORDER BY
      CASE t.status WHEN 'active' THEN 0 WHEN 'paused' THEN 1 ELSE 2 END,
      t.next_run ASC
  `).all();
}

function fetchRunStats(db) {
  return db.prepare(`
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS successes,
      AVG(duration_ms) AS avg_ms,
      MAX(run_at) AS last_run,
      MIN(duration_ms) AS min_ms,
      MAX(duration_ms) AS max_ms
    FROM task_run_logs
  `).get();
}

function fetchTokenEstimate(db) {
  // No real token tracking — estimate from character counts.
  // ~4 chars per token is a rough approximation for English.
  const CHARS_PER_TOKEN = 4;
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 86_400_000).toISOString();

  const all = db.prepare(`SELECT SUM(LENGTH(content)) AS chars, SUM(CASE WHEN is_bot_message=1 THEN LENGTH(content) ELSE 0 END) AS bot_chars FROM messages`).get();
  const todayRow = db.prepare(`SELECT SUM(LENGTH(content)) AS chars FROM messages WHERE timestamp >= ?`).get(today + 'T00:00:00');
  const weekRow  = db.prepare(`SELECT SUM(LENGTH(content)) AS chars FROM messages WHERE timestamp >= ?`).get(weekAgo);

  return {
    allTime:    Math.round((all?.chars    ?? 0) / CHARS_PER_TOKEN),
    today:      Math.round((todayRow?.chars ?? 0) / CHARS_PER_TOKEN),
    thisWeek:   Math.round((weekRow?.chars  ?? 0) / CHARS_PER_TOKEN),
    botAllTime: Math.round((all?.bot_chars  ?? 0) / CHARS_PER_TOKEN),
  };
}

function countGroupLogs(folder) {
  const logsDir = join(GROUPS_DIR, folder, 'logs');
  if (!existsSync(logsDir)) return 0;
  try {
    return readdirSync(logsDir).filter(f => f.endsWith('.log')).length;
  } catch { return 0; }
}

function fmtTokens(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function fmtDuration(ms) {
  if (!ms) return '—';
  if (ms < 1000) return `${Math.round(ms)}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60000)}m${Math.floor((ms % 60000) / 1000)}s`;
}

// ─── Render ───────────────────────────────────────────────────────────────────

function render() {
  out('\x1b[2J\x1b[H'); // clear screen, move to top

  const now = new Date().toLocaleTimeString();
  const running = isRunning();
  const db = openDb();

  // ── Header ──
  const status = running
    ? C.bold + C.green + '● RUNNING' + C.reset
    : C.bold + C.red   + '○ STOPPED' + C.reset;
  const title = bold('NanoClaw Dashboard');
  const ts = dim(now + '  (auto-refresh ' + REFRESH_MS / 1000 + 's)');
  const right = status + '  ' + ts;
  const leftLen = visibleLen(title) + 1;
  const rightLen = visibleLen(right) + 1;
  const gap = Math.max(1, W() - leftLen - rightLen);
  line(' ' + title + ' '.repeat(gap) + right + ' ');
  ruler('═');

  if (!db) {
    line('');
    line(yellow('  No database found at store/messages.db'));
    line(dim('  Run /setup to initialize NanoClaw, or start the service.'));
    line('');
    line(dim('  Press q to quit.'));
    return;
  }

  // ── Groups ──
  const groups = fetchGroups(db);
  section(`GROUPS  ${dim('(' + groups.length + ' registered)')}` );

  if (groups.length === 0) {
    line(dim('  No groups registered yet.'));
  } else {
    line(
      dim('  ') +
      bold(pad('Name', 18)) +
      bold(pad('Last Active', 16)) +
      bold(pad('Messages', 12)) +
      bold(pad('Bot Replies', 12)) +
      bold('Runs')
    );
    for (const g of groups) {
      const runs = countGroupLogs(g.folder);
      line(
        '  ' +
        pad(cyan(truncate(g.name || g.folder, 16)), 18) +
        pad(relativeTime(g.last_message_time), 16) +
        pad(String(g.msg_count ?? 0), 12) +
        pad(String(g.bot_count ?? 0), 12) +
        dim(String(runs))
      );
    }
  }

  // ── Recent Activity ──
  const msgs = fetchRecentMessages(db, 8);
  section('RECENT ACTIVITY');

  if (msgs.length === 0) {
    line(dim('  No messages yet.'));
  } else {
    for (const m of msgs) {
      const time   = dim(new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      const group  = pad(truncate(m.chat_name || m.chat_jid?.split('@')[0] || '?', 14), 15);
      const arrow  = m.is_bot_message ? green('←') : yellow('→');
      const who    = m.is_bot_message ? dim('agent') : truncate(m.sender_name || 'user', 10);
      const snip   = gray(truncate(m.content?.replace(/\n/g, ' ') || '', W() - 52));
      line(`  ${time}  ${group}  ${arrow} ${pad(who, 11)}  ${snip}`);
    }
  }

  // ── Scheduled Tasks ──
  const tasks = fetchTasks(db);
  const activeTasks = tasks.filter(t => t.status === 'active');
  section(`SCHEDULED TASKS  ${dim('(' + activeTasks.length + ' active, ' + tasks.length + ' total)')}`);

  if (tasks.length === 0) {
    line(dim('  No scheduled tasks.'));
  } else {
    line(
      dim('  ') +
      bold(pad('Task prompt', 32)) +
      bold(pad('Schedule', 14)) +
      bold(pad('Next run', 14)) +
      bold(pad('Runs', 7)) +
      bold(pad('Avg', 8)) +
      bold('Status')
    );
    for (const t of tasks) {
      const statusBadge = t.status === 'active'
        ? green('active')
        : t.status === 'paused'
          ? yellow('paused')
          : dim('done');
      const successRate = t.run_count > 0 ? Math.round((t.success_count / t.run_count) * 100) : null;
      const rateStr = successRate !== null ? (successRate === 100 ? green('100%') : successRate >= 80 ? yellow(successRate + '%') : red(successRate + '%')) : dim('—');
      line(
        '  ' +
        pad(truncate(t.prompt, 30), 32) +
        pad(dim(t.schedule_type + ' ' + truncate(t.schedule_value, 8)), 14) +
        pad(formatNext(t.next_run), 14) +
        pad(dim(String(t.run_count)), 7) +
        pad(dim(fmtDuration(t.avg_duration_ms)), 8) +
        statusBadge + dim(' ' + rateStr)
      );
    }
  }

  // ── Performance ──
  const stats = fetchRunStats(db);
  section('TASK RUN PERFORMANCE');
  if (!stats || stats.total === 0) {
    line(dim('  No task runs recorded yet.'));
  } else {
    const pct = stats.total > 0 ? Math.round((stats.successes / stats.total) * 100) : 0;
    line(`  ${bold('Success rate')}  ${bar(pct, 25)} ${pct}%   ${dim(stats.successes + '/' + stats.total + ' runs')}`);
    line(`  ${bold('Avg duration')}  ${dim(fmtDuration(stats.avg_ms))}    ` +
         `${bold('Fastest')} ${dim(fmtDuration(stats.min_ms))}    ` +
         `${bold('Slowest')} ${dim(fmtDuration(stats.max_ms))}    ` +
         `${bold('Last run')} ${relativeTime(stats.last_run)}`);
  }

  // ── Token Estimate ──
  const tok = fetchTokenEstimate(db);
  section('ESTIMATED TOKEN USAGE  ' + dim('(~4 chars/token approximation)'));
  line(
    `  ${bold('Today')}      ${cyan(fmtTokens(tok.today))} tokens` + ' '.repeat(6) +
    `${bold('This week')}  ${cyan(fmtTokens(tok.thisWeek))} tokens` + ' '.repeat(6) +
    `${bold('All time')}   ${cyan(fmtTokens(tok.allTime))} tokens`
  );
  // Rough cost estimate: $3/MTok input + $15/MTok output (Sonnet pricing)
  const inputTok  = tok.allTime - tok.botAllTime;
  const outputTok = tok.botAllTime;
  const costEst = ((inputTok * 3 + outputTok * 15) / 1_000_000).toFixed(4);
  line(`  ${dim('Estimated cost (all time, Sonnet pricing): ~$' + costEst)}`);

  db.close();

  line('');
  ruler();
  line(dim('  [q] quit   [r] refresh now'));
}

// ─── Main loop ────────────────────────────────────────────────────────────────

// Hide cursor, raw mode for keypress
process.stdout.write('\x1b[?25l');
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (key) => {
  if (key === 'q' || key === '\x03') { // q or Ctrl+C
    process.stdout.write('\x1b[?25h'); // restore cursor
    line('');
    process.exit(0);
  }
  if (key === 'r') {
    render();
  }
});

// Restore cursor on exit
process.on('exit', () => process.stdout.write('\x1b[?25h'));
process.on('SIGINT', () => { process.stdout.write('\x1b[?25h'); process.exit(0); });

render();
const interval = setInterval(render, REFRESH_MS);
// Keep process alive
interval.unref();
process.stdin.ref();
