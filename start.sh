#!/bin/bash
# Nuclear start script - pure Node.js only
set -e

echo "STARTING NODE.JS SERVER (NO CADDY)"
export NODE_ENV=production
export PORT=${PORT:-3000}

node dist/index.js