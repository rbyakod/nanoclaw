# Graph Report - /Users/ravibyakod/WORK/NanoClaw  (2026-08-22)

## Corpus Check
- 225 files · ~475,086 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1058 nodes · 2352 edges · 58 communities (53 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.61)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 45
- Community 46
- Community 47
- Community 49
- Community 50

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

## Communities (58 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (104): args, main(), main(), applySkill(), clearBackup(), createBackup(), getBackupDir(), restoreBackup() (+96 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (48): parseArgs(), run(), run(), listGroups(), parseArgs(), run(), syncGroups(), main() (+40 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (38): ASSISTANT_HAS_OWN_NUMBER, ASSISTANT_NAME, CONTAINER_IMAGE, CONTAINER_MAX_OUTPUT_SIZE, CONTAINER_TIMEOUT, DATA_DIR, DISCORD_BOT_TOKEN, DISCORD_ONLY (+30 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (38): ASSISTANT_HAS_OWN_NUMBER, ASSISTANT_NAME, CONTAINER_IMAGE, CONTAINER_MAX_OUTPUT_SIZE, CONTAINER_TIMEOUT, DATA_DIR, envConfig, GROUPS_DIR (+30 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (37): ASSISTANT_HAS_OWN_NUMBER, ASSISTANT_NAME, CONTAINER_IMAGE, CONTAINER_MAX_OUTPUT_SIZE, CONTAINER_TIMEOUT, DATA_DIR, envConfig, GROUPS_DIR (+29 more)

### Community 5 - "Community 5"
Cohesion: 0.11
Nodes (36): writeGroupsSnapshot(), writeTasksSnapshot(), cleanupOrphans(), CONTAINER_RUNTIME_BIN, ensureContainerRuntimeRunning(), readonlyMountArgs(), stopContainer(), mockExecSync (+28 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (5): connectChannel(), triggerConnection(), WhatsAppChannel, WhatsAppChannelOpts, GroupQueue

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (37): bar(), bold(), C, color(), countGroupLogs(), cyan(), DB_PATH, dim() (+29 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (26): SCHEDULER_POLL_INTERVAL, ChatInfo, createSchema(), createTask(), deleteTask(), getDueTasks(), getNewMessages(), getRegisteredGroup() (+18 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (25): CONTAINER_IMAGE, CONTAINER_MAX_OUTPUT_SIZE, CONTAINER_TIMEOUT, DATA_DIR, envConfig, GROUPS_DIR, IDLE_TIMEOUT, IPC_POLL_INTERVAL (+17 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (26): AvailableGroup, buildContainerArgs(), buildVolumeMounts(), ContainerInput, ContainerOutput, readSecrets(), runContainerAgent(), VolumeMount (+18 more)

### Community 11 - "Community 11"
Cohesion: 0.18
Nodes (20): cleanupLockFiles(), extractTweetId(), getBrowserContext(), navigateToTweet(), runScript(), ScriptResult, validateContent(), writeResult() (+12 more)

### Community 12 - "Community 12"
Cohesion: 0.15
Nodes (24): ContainerInput, ContainerOutput, createPreCompactHook(), createSanitizeBashHook(), drainIpcInput(), formatTranscriptMarkdown(), generateFallbackName(), getSessionSummary() (+16 more)

### Community 13 - "Community 13"
Cohesion: 0.15
Nodes (24): ContainerInput, ContainerOutput, createPreCompactHook(), createSanitizeBashHook(), drainIpcInput(), formatTranscriptMarkdown(), generateFallbackName(), getSessionSummary() (+16 more)

### Community 14 - "Community 14"
Cohesion: 0.10
Nodes (7): HandledMessageEvent, SlackChannel, SlackChannelOpts, appRef, currentApp(), Handler, triggerMessageEvent()

### Community 15 - "Community 15"
Cohesion: 0.09
Nodes (8): DiscordChannel, DiscordChannelOpts, clientRef, currentClient(), Handler, MockClient, TextChannel, triggerMessage()

### Community 16 - "Community 16"
Cohesion: 0.09
Nodes (7): TelegramChannel, TelegramChannelOpts, botRef, currentBot(), Handler, triggerMediaMessage(), triggerTextMessage()

### Community 17 - "Community 17"
Cohesion: 0.09
Nodes (22): @anthropic-ai/claude-agent-sdk, dependencies, @anthropic-ai/claude-agent-sdk, cron-parser, @modelcontextprotocol/sdk, zod, description, devDependencies (+14 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (6): connectChannel(), triggerConnection(), WhatsAppChannel, getLastGroupSync(), setLastGroupSync(), updateChatName()

### Community 19 - "Community 19"
Cohesion: 0.12
Nodes (11): WhatsAppChannelOpts, ASSISTANT_HAS_OWN_NUMBER, ContainerOutput, testGroup, testInput, SchedulerDependencies, Channel, ContainerConfig (+3 more)

### Community 20 - "Community 20"
Cohesion: 0.09
Nodes (21): compilerOptions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames, lib, module, moduleResolution (+13 more)

### Community 21 - "Community 21"
Cohesion: 0.11
Nodes (19): better-sqlite3, dependencies, better-sqlite3, cron-parser, pino, pino-pretty, qrcode, qrcode-terminal (+11 more)

### Community 22 - "Community 22"
Cohesion: 0.11
Nodes (19): husky, devDependencies, husky, prettier, tsx, @types/better-sqlite3, @types/node, @types/qrcode-terminal (+11 more)

### Community 23 - "Community 23"
Cohesion: 0.12
Nodes (16): __tests__, **/*.ts, compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, lib, module, moduleResolution (+8 more)

### Community 24 - "Community 24"
Cohesion: 0.18
Nodes (15): MOUNT_ALLOWLIST_PATH, DEFAULT_BLOCKED_PATTERNS, expandPath(), findAllowedRoot(), getRealPath(), isValidContainerPath(), loadMountAllowlist(), logger (+7 more)

### Community 25 - "Community 25"
Cohesion: 0.17
Nodes (3): GmailChannel, GmailChannelOpts, ThreadMeta

### Community 26 - "Community 26"
Cohesion: 0.12
Nodes (15): compilerOptions, declaration, esModuleInterop, module, moduleResolution, outDir, rootDir, skipLibCheck (+7 more)

### Community 27 - "Community 27"
Cohesion: 0.15
Nodes (13): scripts, auth, build, dev, format, format:check, format:fix, prepare (+5 more)

### Community 28 - "Community 28"
Cohesion: 0.26
Nodes (9): ASSISTANT_NAME, TRIGGER_PATTERN, shouldProcess(), shouldRequireTrigger(), escapeXml(), formatMessages(), formatOutbound(), stripInternalTags() (+1 more)

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (7): entries, MigrationResult, migrationsDir, migrationVersions, projectRoot, results, tsxBin

### Community 30 - "Community 30"
Cohesion: 0.47
Nodes (7): buildVolumeMounts(), assertValidGroupFolder(), ensureWithinBase(), isValidGroupFolder(), RESERVED_FOLDERS, resolveGroupFolderPath(), resolveGroupIpcPath()

### Community 31 - "Community 31"
Cohesion: 0.46
Nodes (6): cleanupOrphans(), CONTAINER_RUNTIME_BIN, ensureContainerRuntimeRunning(), readonlyMountArgs(), stopContainer(), mockExecSync

### Community 32 - "Community 32"
Cohesion: 0.25
Nodes (7): description, engines, node, main, name, type, version

### Community 33 - "Community 33"
Cohesion: 0.43
Nodes (7): discoverSkills(), initNanoclaw(), main(), resetWorkingTree(), setOutput(), SkillValidationResult, truncate()

### Community 34 - "Community 34"
Cohesion: 0.33
Nodes (4): DEFAULT_CONFIG, transcribeAudioMessage(), transcribeWithOpenAI(), TranscriptionConfig

### Community 35 - "Community 35"
Cohesion: 0.38
Nodes (6): createXTools(), RESULTS_DIR, SkillToolsContext, TASKS_DIR, waitForResult(), writeIpcFile()

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (5): args, jsonMode, newCorePath, preview, previewOnly

### Community 37 - "Community 37"
Cohesion: 0.71
Nodes (6): check_build_tools(), check_node(), detect_platform(), install_deps(), log(), setup.sh script

### Community 38 - "Community 38"
Cohesion: 0.38
Nodes (6): askQuestion(), authenticate(), connectSocket(), logger, phoneArg, usePairingCode

### Community 39 - "Community 39"
Cohesion: 0.47
Nodes (5): handleXIpc(), logger, runScript(), SkillResult, writeResult()

### Community 40 - "Community 40"
Cohesion: 0.33
Nodes (4): MESSAGES_DIR, server, TASKS_DIR, transport

### Community 41 - "Community 41"
Cohesion: 0.53
Nodes (5): FixResult, fixSkill(), main(), readManifest(), setOutput()

### Community 42 - "Community 42"
Cohesion: 0.50
Nodes (4): getGmailMode(), mode, read(), root

## Knowledge Gaps
- **263 isolated node(s):** `Handler`, `clientRef`, `TextChannel`, `envConfig`, `ASSISTANT_HAS_OWN_NUMBER` (+258 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `line()` connect `Community 7` to `Community 9`, `Community 10`, `Community 12`, `Community 13`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `runContainerAgent()` connect `Community 9` to `Community 5`, `Community 7`, `Community 8`, `Community 19`, `Community 30`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `runContainerAgent()` connect `Community 10` to `Community 7`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `Handler`, `clientRef`, `TextChannel` to the rest of the system?**
  _263 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05804953560371517 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.10259122157588578 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.07084785133565621 - nodes in this community are weakly interconnected._