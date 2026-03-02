#!/usr/bin/env bash
set -e

PLIST="$HOME/Library/LaunchAgents/com.nanoclaw.plist"

if ! launchctl list com.nanoclaw &>/dev/null; then
  echo "NanoClaw is not running."
  exit 0
fi

launchctl unload "$PLIST"
echo "NanoClaw stopped."

# Stop any agent containers that outlived the main process
CONTAINERS=$(docker ps --filter "name=nanoclaw-" --format "{{.Names}}" 2>/dev/null)
if [ -n "$CONTAINERS" ]; then
  echo "Stopping agent containers..."
  echo "$CONTAINERS" | xargs docker stop
fi
