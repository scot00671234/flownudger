#!/bin/bash
# Post-build fix for production deployment

echo "Running build..."
npm run build

echo "Fixing import.meta.dirname in production bundle..."
cd dist

# Replace all import.meta.dirname with __dirname
sed 's/import\.meta\.dirname/__dirname/g' index.js > index.js.tmp && mv index.js.tmp index.js

# Add __dirname definition at the top
cat > index.js.tmp << 'EOF'
// Fix for Node.js ES modules - define __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

EOF

# Append the rest of the file
tail -n +1 index.js >> index.js.tmp && mv index.js.tmp index.js

echo "Build fixed for production deployment"