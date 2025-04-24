# Do NOT include a shebang if you want to source this script
# Purpose: Restart frontend + backend in production mode
# Usage: source ./restart.prod.sh

export NODE_ENV="production"

# Kill existing processes (adjust the grep patterns as needed)
pkill -f "node ./bin/www"
pkill -f "react-scripts build"
pkill -f "serve -s build"
pkill -f "redis-server"
echo "Front and backend shut down"
sleep 2 # give time for processes to end

# Navigate to frontend directory and start the React app
npm run build && serve -s build &
if [ $? -ne 0 ]; then
  echo "❌ Failed to start frontend" exit 1
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

echo "🚀 $NODE_ENV environment is up and running!"