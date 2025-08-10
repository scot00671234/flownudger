# TOML SYNTAX ERROR RESOLVED

## The Issue
The `[providers]` section with `nodejs = { version = "18" }` was using incorrect TOML syntax for Nixpacks.

## The Fix
Replaced with standard Nixpacks syntax:

```toml
[phases.setup]
nixpkgs = ["nodejs-18"]

[phases.install]
cmd = "npm ci"

[phases.build]
cmd = "npm run build"

[start]
cmd = "npm run start"

[variables]
NODE_ENV = "production"
PORT = "3000"
```

## Why This Works
- Standard Nixpacks TOML syntax
- No provider maps that cause parsing errors
- Explicit Node.js 18 installation
- Port 3000 as requested
- No Caddy detection (hidden by .dockerignore)

Deploy this configuration now - the TOML parsing error is fixed.