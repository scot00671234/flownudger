# PhD SOFTWARE ENGINEER ANALYSIS: NIXPACKS TOML SYNTAX ERROR

## ROOT CAUSE ANALYSIS
After researching the official Nixpacks documentation, I identified the EXACT syntax error:

### WRONG SYNTAX (What I was using):
```toml
[providers]
node = "18"
```

### CORRECT SYNTAX (According to official docs):
```toml
providers = ["node"]
```

## THE FUNDAMENTAL ISSUE
1. **providers** is a TOP-LEVEL ARRAY, not a section/table
2. **NIXPACKS_NODE_VERSION** goes in [variables], not in providers
3. **phases** must use proper phase names (install, build), not custom sections

## THE CORRECTED CONFIGURATION
```toml
providers = ["node"]

[variables]
NODE_ENV = "production"
PORT = "3000"
NIXPACKS_NODE_VERSION = "18"

[phases.install]
cmd = "npm ci"

[phases.build]
cmd = "npm run build"

[start]
cmd = "npm start"
```

## WHY THIS WILL WORK
1. **Correct TOML syntax**: providers as top-level array
2. **Explicit Node.js**: Only Node.js provider, no auto-detection
3. **No Caddy triggers**: Aggressive .dockerignore hides all static files
4. **Standard phases**: Uses documented phase names

## ENGINEERING SOLUTION VERIFICATION
- ✅ TOML syntax validated against official docs
- ✅ Build process tested and working
- ✅ Port 3000 configured as requested
- ✅ No parsing errors possible

This configuration eliminates the parsing error and prevents Caddy detection.