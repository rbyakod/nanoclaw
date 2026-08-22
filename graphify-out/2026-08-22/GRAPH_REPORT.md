# Graph Report - NanoClaw  (2026-08-22)

## Corpus Check
- 202 files · ~477,321 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1060 nodes · 2348 edges · 63 communities (56 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a6e1851f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- skills-engine/index.ts
- emitStatus
- add-discord/modify/src/index.ts
- add-telegram/modify/src/index.ts
- add-slack/modify/src/index.ts
- src/index.ts
- WhatsAppChannel
- dashboard.js
- db.ts
- src/config.ts
- add-gmail/modify/src/index.ts
- browser.ts
- modify/container/agent-runner/src/index.ts
- container/agent-runner/src/index.ts
- SlackChannel
- channels/discord.test.ts
- channels/telegram.test.ts
- agent-runner/package.json
- src/types.ts
- WhatsAppChannel
- compilerOptions
- dependencies
- devDependencies
- compilerOptions
- mount-security.ts
- GmailChannel
- compilerOptions
- scripts
- formatting.test.ts
- run-migrations.ts
- group-folder.ts
- modify/src/container-runtime.test.ts
- package.json
- validate-all-skills.ts
- transcription.ts
- agent.ts
- update-core.ts
- setup.sh
- src/whatsapp-auth.ts
- host.ts
- ipc-mcp-stdio.ts
- fix-skill-drift.ts
- tests/gmail.test.ts
- modify/container/build.sh
- fetch-upstream.sh
- container/build.sh
- start.sh
- stop.sh
- src/container-runner.ts
- GroupQueue
- task-scheduler.ts
- post-commit
- post-checkout

## God Nodes (most connected - your core abstractions)
1. `render()` - 29 edges
2. `readState()` - 29 edges
3. `applySkill()` - 27 edges
4. `emitStatus()` - 22 edges
5. `logger` - 21 edges
6. `writeState()` - 20 edges
7. `applyUpdate()` - 19 edges
8. `GroupQueue` - 19 edges
9. `main()` - 19 edges
10. `createTempDir()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `parseTranscript()` --indirect_call--> `line()`  [INFERRED]
  .claude/skills/add-gmail/modify/container/agent-runner/src/index.ts → dashboard.js
- `runContainerAgent()` --indirect_call--> `line()`  [INFERRED]
  .claude/skills/add-gmail/modify/src/container-runner.ts → dashboard.js
- `parseTranscript()` --indirect_call--> `line()`  [INFERRED]
  container/agent-runner/src/index.ts → dashboard.js
- `runContainerAgent()` --indirect_call--> `line()`  [INFERRED]
  src/container-runner.ts → dashboard.js
- `migrationVersions` --calls--> `compareSemver()`  [EXTRACTED]
  scripts/run-migrations.ts → skills-engine/state.ts

## Import Cycles
- None detected.

## Communities (63 total, 7 thin omitted)

### Community 0 - "skills-engine/index.ts"
Cohesion: 0.06
Nodes (104): args, main(), main(), applySkill(), clearBackup(), createBackup(), getBackupDir(), restoreBackup() (+96 more)

### Community 1 - "emitStatus"
Cohesion: 0.10
Nodes (46): parseArgs(), run(), run(), listGroups(), parseArgs(), run(), syncGroups(), main() (+38 more)

### Community 2 - "add-discord/modify/src/index.ts"
Cohesion: 0.07
Nodes (37): ASSISTANT_HAS_OWN_NUMBER, ASSISTANT_NAME, CONTAINER_IMAGE, CONTAINER_MAX_OUTPUT_SIZE, CONTAINER_TIMEOUT, DATA_DIR, DISCORD_BOT_TOKEN, DISCORD_ONLY (+29 more)

### Community 3 - "add-telegram/modify/src/index.ts"
Cohesion: 0.07
Nodes (37): ASSISTANT_HAS_OWN_NUMBER, ASSISTANT_NAME, CONTAINER_IMAGE, CONTAINER_MAX_OUTPUT_SIZE, CONTAINER_TIMEOUT, DATA_DIR, envConfig, GROUPS_DIR (+29 more)

### Community 4 - "add-slack/modify/src/index.ts"
Cohesion: 0.08
Nodes (36): ASSISTANT_HAS_OWN_NUMBER, ASSISTANT_NAME, CONTAINER_IMAGE, CONTAINER_MAX_OUTPUT_SIZE, CONTAINER_TIMEOUT, DATA_DIR, envConfig, GROUPS_DIR (+28 more)

### Community 5 - "src/index.ts"
Cohesion: 0.16
Nodes (24): writeGroupsSnapshot(), getAllChats(), getAllRegisteredGroups(), getAllSessions(), getMessagesSince(), getNewMessages(), getRouterState(), storeChatMetadata() (+16 more)

### Community 6 - "WhatsAppChannel"
Cohesion: 0.13
Nodes (4): connectChannel(), triggerConnection(), WhatsAppChannel, WhatsAppChannelOpts

### Community 7 - "dashboard.js"
Cohesion: 0.13
Nodes (37): bar(), bold(), C, color(), countGroupLogs(), cyan(), DB_PATH, dim() (+29 more)

### Community 8 - "db.ts"
Cohesion: 0.14
Nodes (22): AvailableGroup, ChatInfo, createSchema(), createTask(), deleteTask(), getRegisteredGroup(), getTaskById(), initDatabase() (+14 more)

### Community 9 - "src/config.ts"
Cohesion: 0.11
Nodes (17): ASSISTANT_HAS_OWN_NUMBER, CONTAINER_IMAGE, CONTAINER_MAX_OUTPUT_SIZE, CONTAINER_TIMEOUT, DATA_DIR, envConfig, GROUPS_DIR, IDLE_TIMEOUT (+9 more)

### Community 10 - "add-gmail/modify/src/index.ts"
Cohesion: 0.13
Nodes (26): AvailableGroup, buildContainerArgs(), buildVolumeMounts(), ContainerInput, ContainerOutput, readSecrets(), runContainerAgent(), VolumeMount (+18 more)

### Community 11 - "browser.ts"
Cohesion: 0.18
Nodes (20): cleanupLockFiles(), extractTweetId(), getBrowserContext(), navigateToTweet(), runScript(), ScriptResult, validateContent(), writeResult() (+12 more)

### Community 12 - "modify/container/agent-runner/src/index.ts"
Cohesion: 0.15
Nodes (24): ContainerInput, ContainerOutput, createPreCompactHook(), createSanitizeBashHook(), drainIpcInput(), formatTranscriptMarkdown(), generateFallbackName(), getSessionSummary() (+16 more)

### Community 13 - "container/agent-runner/src/index.ts"
Cohesion: 0.15
Nodes (24): ContainerInput, ContainerOutput, createPreCompactHook(), createSanitizeBashHook(), drainIpcInput(), formatTranscriptMarkdown(), generateFallbackName(), getSessionSummary() (+16 more)

### Community 14 - "SlackChannel"
Cohesion: 0.10
Nodes (7): HandledMessageEvent, SlackChannel, SlackChannelOpts, appRef, currentApp(), Handler, triggerMessageEvent()

### Community 15 - "channels/discord.test.ts"
Cohesion: 0.09
Nodes (8): DiscordChannel, DiscordChannelOpts, clientRef, currentClient(), Handler, MockClient, TextChannel, triggerMessage()

### Community 16 - "channels/telegram.test.ts"
Cohesion: 0.09
Nodes (7): TelegramChannel, TelegramChannelOpts, botRef, currentBot(), Handler, triggerMediaMessage(), triggerTextMessage()

### Community 17 - "agent-runner/package.json"
Cohesion: 0.09
Nodes (22): @anthropic-ai/claude-agent-sdk, dependencies, @anthropic-ai/claude-agent-sdk, cron-parser, @modelcontextprotocol/sdk, zod, description, devDependencies (+14 more)

### Community 18 - "src/types.ts"
Cohesion: 0.16
Nodes (13): connectChannel(), triggerConnection(), WhatsAppChannelOpts, getLastGroupSync(), setLastGroupSync(), updateChatName(), SchedulerDependencies, ContainerConfig (+5 more)

### Community 20 - "compilerOptions"
Cohesion: 0.09
Nodes (21): compilerOptions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames, lib, module, moduleResolution (+13 more)

### Community 21 - "dependencies"
Cohesion: 0.11
Nodes (19): better-sqlite3, dependencies, better-sqlite3, cron-parser, pino, pino-pretty, qrcode, qrcode-terminal (+11 more)

### Community 22 - "devDependencies"
Cohesion: 0.11
Nodes (19): husky, devDependencies, husky, prettier, tsx, @types/better-sqlite3, @types/node, @types/qrcode-terminal (+11 more)

### Community 23 - "compilerOptions"
Cohesion: 0.12
Nodes (16): __tests__, **/*.ts, compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, lib, module, moduleResolution (+8 more)

### Community 24 - "mount-security.ts"
Cohesion: 0.19
Nodes (14): MOUNT_ALLOWLIST_PATH, DEFAULT_BLOCKED_PATTERNS, expandPath(), findAllowedRoot(), getRealPath(), isValidContainerPath(), loadMountAllowlist(), logger (+6 more)

### Community 25 - "GmailChannel"
Cohesion: 0.17
Nodes (3): GmailChannel, GmailChannelOpts, ThreadMeta

### Community 26 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, declaration, esModuleInterop, module, moduleResolution, outDir, rootDir, skipLibCheck (+7 more)

### Community 27 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, auth, build, dev, format, format:check, format:fix, prepare (+5 more)

### Community 28 - "formatting.test.ts"
Cohesion: 0.26
Nodes (9): ASSISTANT_NAME, TRIGGER_PATTERN, shouldProcess(), shouldRequireTrigger(), escapeXml(), formatMessages(), formatOutbound(), stripInternalTags() (+1 more)

### Community 29 - "run-migrations.ts"
Cohesion: 0.22
Nodes (7): entries, MigrationResult, migrationsDir, migrationVersions, projectRoot, results, tsxBin

### Community 30 - "group-folder.ts"
Cohesion: 0.40
Nodes (8): buildVolumeMounts(), assertValidGroupFolder(), ensureWithinBase(), isValidGroupFolder(), RESERVED_FOLDERS, resolveGroupFolderPath(), resolveGroupIpcPath(), validateAdditionalMounts()

### Community 31 - "modify/src/container-runtime.test.ts"
Cohesion: 0.46
Nodes (6): cleanupOrphans(), CONTAINER_RUNTIME_BIN, ensureContainerRuntimeRunning(), readonlyMountArgs(), stopContainer(), mockExecSync

### Community 32 - "package.json"
Cohesion: 0.25
Nodes (7): description, engines, node, main, name, type, version

### Community 33 - "validate-all-skills.ts"
Cohesion: 0.43
Nodes (7): discoverSkills(), initNanoclaw(), main(), resetWorkingTree(), setOutput(), SkillValidationResult, truncate()

### Community 34 - "transcription.ts"
Cohesion: 0.40
Nodes (4): DEFAULT_CONFIG, transcribeAudioMessage(), transcribeWithOpenAI(), TranscriptionConfig

### Community 35 - "agent.ts"
Cohesion: 0.38
Nodes (6): createXTools(), RESULTS_DIR, SkillToolsContext, TASKS_DIR, waitForResult(), writeIpcFile()

### Community 36 - "update-core.ts"
Cohesion: 0.29
Nodes (5): args, jsonMode, newCorePath, preview, previewOnly

### Community 37 - "setup.sh"
Cohesion: 0.71
Nodes (6): check_build_tools(), check_node(), detect_platform(), install_deps(), log(), setup.sh script

### Community 38 - "src/whatsapp-auth.ts"
Cohesion: 0.38
Nodes (6): askQuestion(), authenticate(), connectSocket(), logger, phoneArg, usePairingCode

### Community 39 - "host.ts"
Cohesion: 0.47
Nodes (5): handleXIpc(), logger, runScript(), SkillResult, writeResult()

### Community 40 - "ipc-mcp-stdio.ts"
Cohesion: 0.33
Nodes (4): MESSAGES_DIR, server, TASKS_DIR, transport

### Community 41 - "fix-skill-drift.ts"
Cohesion: 0.53
Nodes (5): FixResult, fixSkill(), main(), readManifest(), setOutput()

### Community 42 - "tests/gmail.test.ts"
Cohesion: 0.50
Nodes (4): getGmailMode(), mode, read(), root

### Community 58 - "src/container-runner.ts"
Cohesion: 0.15
Nodes (20): buildContainerArgs(), ContainerInput, ContainerOutput, readSecrets(), rotateLogsDir(), runContainerAgent(), testGroup, testInput (+12 more)

### Community 60 - "task-scheduler.ts"
Cohesion: 0.38
Nodes (8): writeTasksSnapshot(), getAllTasks(), getDueTasks(), logTaskRun(), updateTaskAfterRun(), _resetSchedulerLoopForTests(), runTask(), startSchedulerLoop()

### Community 61 - "post-commit"
Cohesion: 0.40
Nodes (4): post-commit script, GRAPHIFY_CHANGED, GRAPHIFY_REBUILD_LOG, PYTHONHASHSEED

### Community 62 - "post-checkout"
Cohesion: 0.50
Nodes (3): post-checkout script, GRAPHIFY_REBUILD_LOG, PYTHONHASHSEED

## Knowledge Gaps
- **260 isolated node(s):** `Handler`, `clientRef`, `TextChannel`, `envConfig`, `ASSISTANT_HAS_OWN_NUMBER` (+255 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `line()` connect `dashboard.js` to `add-gmail/modify/src/index.ts`, `src/container-runner.ts`, `modify/container/agent-runner/src/index.ts`, `container/agent-runner/src/index.ts`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `runContainerAgent()` connect `src/container-runner.ts` to `task-scheduler.ts`, `src/index.ts`, `group-folder.ts`, `dashboard.js`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `runContainerAgent()` connect `add-gmail/modify/src/index.ts` to `dashboard.js`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `Handler`, `clientRef`, `TextChannel` to the rest of the system?**
  _260 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `skills-engine/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05804953560371517 - nodes in this community are weakly interconnected._
- **Should `emitStatus` be split into smaller, more focused modules?**
  _Cohesion score 0.1016949152542373 - nodes in this community are weakly interconnected._
- **Should `add-discord/modify/src/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07317073170731707 - nodes in this community are weakly interconnected._