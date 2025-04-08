# Do NOT include a shebang if you want to source this script
# Purpose: Restart frontend + backend in development mode
# Usage: source ./restart.dev.sh

# Set the NODE_ENV for this shell session
export NODE_ENV="development"
echo "NODE_ENV set to $NODE_ENV"

# Kill running backend/frontend/redis processes
echo "Shutting down existing processes..."
pkill -f "node ./bin/www" 2>/dev/null
pkill -f "start" 2>/dev/null
pkill -f "redis-server" 2>/dev/null
sleep 2
echo "Processes shut down."

# Start frontend (React)
echo "Starting frontend..."
npm start > frontend.log 2>&1 &
if [ $? -ne 0 ]; then
  echo "❌ Failed to start frontend"
  return 1
fi
echo "✅ Frontend started (log: frontend.log)"

# Start backend
echo "Starting backend..."
cd ./api || { echo "❌ Failed to cd into ./api"; return 1; }

# Start Redis
npm run start:redis > redis.log 2>&1 &
sleep 2
echo "Redis started (log: redis.log)"

# Start backend server
npm start > server.log 2>&1 &
echo "✅ Backend started (log: server.log)"

# Move back to root
cd ..

echo "🚀 Development environment is up and running!"
