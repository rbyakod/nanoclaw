#!/usr/bin/env bash
set -e

PLIST="$HOME/Library/LaunchAgents/com.nanoclaw.plist"

if [ ! -f "$PLIST" ]; then
  echo "Error: $PLIST not found. Run /setup first."
  exit 1
fi

# Ensure Docker is running
if ! docker info &>/dev/null; then
  echo "Docker is not running — starting Docker..."
  open -a Docker
  echo "Waiting for Docker to be ready..."
  until docker info &>/dev/null; do sleep 2; done
  echo "Docker is ready."
fi

# If already loaded, restart; otherwise load fresh
if launchctl list com.nanoclaw &>/dev/null; then
  echo "NanoClaw is already running — restarting..."
  launchctl kickstart -k "gui/$(id -u)/com.nanoclaw"
else
  launchctl load "$PLIST"
  echo "NanoClaw started."
fi
