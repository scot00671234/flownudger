# VPS Deployment Guide - Dokploy with Nixpacks

## CRITICAL: NUCLEAR ANTI-CADDY SOLUTION

**FUCK CADDY - USE DOCKER BUILD METHOD INSTEAD OF NIXPACKS**

Nixpacks is broken and force-adds Caddy despite ALL configuration attempts. The Express.js server handles both API and static file serving.

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

**NUCLEAR SOLUTION**: Use Docker build method instead of Nixpacks:
```bash
# In Dokploy, select "Docker" instead of "Nixpacks" as build method
# This COMPLETELY bypasses all Nixpacks auto-detection bullshit
```

**If forced to use Nixpacks**: Nuclear configuration with custom scripts:
- Uses `build.sh` and `start.sh` to bypass auto-detection
- Hides ALL static files via aggressive `.dockerignore`
- Custom nixpacks.toml prevents provider detection

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