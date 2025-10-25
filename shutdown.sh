#!/bin/bash
# Purpose: Shutdown frontend + backend servers for CRA + Node API project
# Usage: ./shutdown.sh

log() {
  printf "\033[1;34m[%s]\033[0m %s\n" "$(date '+%H:%M:%S')" "$1"
}

log "Checking for running processes on ports 3000 and 5001..."
pids=$(lsof -ti:3000 -ti:5001)

if [ -z "$pids" ]; then
  log "No running processes found."
  exit 0
else
  log "Found processes: $pids"
fi

log "Attempting graceful shutdown..."
kill -15 $pids 2>/dev/null
sleep 3

still_running=$(lsof -ti:3000 -ti:5001)
if [ -n "$still_running" ]; then
  log "Forcing termination of remaining processes..."
  kill -9 $still_running 2>/dev/null
fi

log "Stopping known application processes..."
pkill -f "node.*api/bin/www" 2>/dev/null
pkill -f "react-scripts start" 2>/dev/null
pkill -f "serve -s build" 2>/dev/null
pkill -f "redis-server" 2>/dev/null

sleep 2
log "✅ All services terminated successfully."

