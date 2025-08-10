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
- `nixpacks.toml` - **Explicitly prevents Caddy usage**
- `Procfile` - Backup process definition
- `Dockerfile` - Alternative Docker deployment
- `.no-caddy` - Signal file to prevent static detection

## Deployment Architecture
- **Single Node.js process** serves everything
- **No reverse proxy needed** (Caddy, Nginx, etc.)
- **Express.js** handles both API routes and static file serving
- **Built files** served directly from `/client/dist`

## Troubleshooting VPS Issues

### "Is a directory" Error
This occurs when Nixpacks tries to use Caddy. Solutions:
1. Use the simplified `nixpacks.toml` (no providers section)
2. Ensure build completes with `npm run build`
3. Set environment variables: `NODE_ENV=production PORT=3000`

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