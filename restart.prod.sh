# Do NOT include a shebang if you want to source this script
# Purpose: Restart frontend + backend
# Usage: source ./restart.prod.sh

# Kill existing processes (adjust the grep patterns as needed)
pkill -f "./api/bin/www"
pkill -f "react-scripts build"
pkill -f "serve -s build"
# pkill -f "redis-server"
echo "Front and backend shut down"
sleep 2 # give time for processes to end

# Start backend
echo "Starting backend..."

# Start Redis
# npm run start:redis > redis.log 2>&1 &
# sleep 2
# echo "Redis started (log: redis.log)"

# Start backend server
npm run start:server > server.log 2>&1 &
sleep 2
echo "✅ Backend started (log: server.log)"

# start the React app
npm run build && serve -s build &
if [ $? -ne 0 ]; then
  echo "❌ Failed to start frontend" exit 1
fi
echo "✅ Frontend started (log: frontend.log)"

echo "🚀 $NODE_ENV environment is up and running!"