# Deployment Guide for Flow Waitlist App

## Prerequisites
- VPS with Docker support
- Dokploy installed
- PostgreSQL database

## Environment Variables Required
```bash
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
PORT=3000
```

## Deployment Steps

1. **Clone the repository** to your VPS
2. **Set environment variables** in Dokploy
3. **Configure PostgreSQL** database connection
4. **Deploy** using Nixpacks (Dockerfile and nixpacks.toml included)

## Database Setup
The app uses PostgreSQL with the following tables:
- `users` - Basic user authentication (for future use)
- `waitlist_signups` - Email addresses with timestamps

## Admin Access
- Visit `/admin` to view all waitlist signups
- API endpoint: `/api/admin/waitlist` returns JSON with all signups

## API Endpoints
- `POST /api/waitlist` - Add email to waitlist
- `GET /api/waitlist/count` - Get total signup count
- `GET /api/admin/waitlist` - Get all signups (admin)

## File Structure
- `server/` - Express.js backend
- `client/` - React frontend  
- `shared/` - Shared types and schemas
- `Dockerfile` - Production Docker configuration
- `nixpacks.toml` - Nixpacks build configuration

## Notes
- Caddy is ignored via `.dockerignore`
- Database migrations handled by Drizzle ORM
- Production build serves static files from Express