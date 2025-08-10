# VPS Deployment Guide - Dokploy with Nixpacks

## CRITICAL: Fixing Caddy Deployment Issues

This project is specifically configured to **avoid Caddy conflicts** in Nixpacks. The Express.js server handles both API and static file serving.

## Environment Variables Required
```bash
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=3000
```

## Key Files for VPS Deployment
- `nixpacks.toml` - **Minimal configuration to prevent Caddy detection**
- `Procfile` - Backup process definition  
- `Dockerfile` - **RECOMMENDED: Direct Docker deployment (bypasses Nixpacks)**
- `.dockerignore` - Hides static files from detection

## Deployment Architecture
- **Single Node.js process** serves everything
- **No reverse proxy needed** (Caddy, Nginx, etc.)
- **Express.js** handles both API routes and static file serving
- **Built files** served directly from `/client/dist`

## Troubleshooting VPS Issues

### "Is a directory" / Caddy Errors
The core issue is Nixpacks auto-detecting static files and adding Caddy. Solutions:

**CRITICAL FIX**: Use the minimal `nixpacks.toml` with no provider detection:
```toml
[build]

[phases.build]
cmd = "npm ci && npm run build"

[start]
cmd = "npm run start"
```

**Alternative**: Use the Dockerfile instead of Nixpacks for deployment:
```bash
# In Dokploy, select "Docker" instead of "Nixpacks" as build method
# The Dockerfile is already configured for production deployment
```

**Required Environment Variables**: `NODE_ENV=production PORT=3000`

### Container Not Found Errors
1. Check Dokploy logs for build completion
2. Verify `npm run build` completes successfully
3. Ensure `npm run start` command works

## Database Setup Commands
```bash
# After deployment, run migrations
npm run db:push
```

## API Endpoints
- `POST /api/waitlist` - Add email to waitlist
- `GET /api/waitlist/count` - Get total signup count  
- `GET /api/admin/waitlist` - Get all signups (admin view)

## Admin Access
Visit `/admin` to view waitlist analytics and all signups.

## Architecture Notes
- **Full-stack in one process**: No microservices needed
- **Static files**: Bundled and served by Express in production
- **Database**: PostgreSQL with Drizzle ORM migrations
- **Security**: Input validation with Zod schemas