#!/bin/bash
# Nuclear deployment script - bypasses ALL auto-detection
set -e

echo "ANTI-CADDY BUILD SCRIPT STARTING..."

# Install dependencies
npm ci

# Build the application  
npm run build

# Hide any remaining static indicators after build
rm -rf client/dist/*.html 2>/dev/null || true

echo "BUILD COMPLETE - NO CADDY DETECTED"