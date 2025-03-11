#!/bin/bash

# Shut down applications
pkill -f "NODE_ENV=development node ./bin/www"
pkill -f "NODE_ENV=development react-scripts start"
pkill -f "redis-server"
echo "Front and backend shut down"