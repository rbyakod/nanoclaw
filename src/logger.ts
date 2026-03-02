import pino from 'pino';

// Redact sensitive patterns from log output to prevent credential/PII leakage
const SECRET_PATTERNS = [
  // Anthropic API keys: sk-ant-api03-...
  /sk-ant-api[0-9]+-[A-Za-z0-9_-]{90,}/g,
  // Generic bearer tokens
  /Bearer\s+[A-Za-z0-9\-._~+/]{20,}={0,2}/gi,
  // OAuth tokens (long base64-ish strings preceded by oauth_token=)
  /oauth_token=[A-Za-z0-9%._-]{20,}/gi,
];

export function redactSecrets(value: string): string {
  let result = value;
  for (const pattern of SECRET_PATTERNS) {
    result = result.replace(pattern, '[REDACTED]');
  }
  return result;
}

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: { target: 'pino-pretty', options: { colorize: true } },
  serializers: {
    // Redact secrets from any string fields named stderr/stdout/error/err
    stderr: (v: unknown) =>
      typeof v === 'string' ? redactSecrets(v) : v,
    stdout: (v: unknown) =>
      typeof v === 'string' ? redactSecrets(v) : v,
    error: (v: unknown) =>
      typeof v === 'string' ? redactSecrets(v) : v,
  },
});

// Route uncaught errors through pino so they get timestamps in stderr
process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error({ err: reason }, 'Unhandled rejection');
});
