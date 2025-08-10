# Flow - Invoice Nudging Service

A professional, clean, and minimalist landing page for Flow - an invoice nudging service designed to capture and engage potential users before launch.

## Overview

Flow automates your invoice follow-ups with intelligent nudges, helping you get paid faster while maintaining professional relationships with your clients. This waitlist application showcases the product's value proposition and collects email addresses from interested users.

## Features

### Landing Page
- **Clean, Minimalist Design** - Professional aesthetic with optimized spacing and typography
- **Centered Hero Section** - Focused messaging with clear call-to-action
- **Interactive Dashboard Preview** - Custom component showing realistic invoice nudging workflow
- **Benefits Section** - Six key value propositions with compelling statistics
- **How It Works** - Simple 3-step process explanation
- **FAQ Section** - Addresses common user questions (no launch timeline mentioned)
- **Responsive Design** - Optimized for all screen sizes

### Technical Features
- **PostgreSQL Database** - Persistent email collection and storage
- **Admin Dashboard** - View collected emails at `/admin` with timestamps and analytics
- **Real-time Counter** - Shows number of people who joined the waitlist
- **Form Validation** - Client and server-side email validation
- **Toast Notifications** - User feedback for successful signups
- **SEO Optimized** - Meta tags and semantic HTML structure

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **Vite** for build tooling
- **Wouter** for routing
- **TanStack Query** for server state management
- **React Hook Form** + Zod for form validation
- **Lucide React** for icons

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with Neon serverless database
- **Drizzle ORM** for database operations
- **Zod** for API validation
- **Custom middleware** for logging and error handling

### Development
- **Hot Module Replacement** - Fast development experience
- **TypeScript** throughout the stack
- **ESLint** and **Prettier** for code quality
- **Path aliases** for clean imports

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (or Neon account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/scot00671234/flownudger.git
   cd flownudger
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio for database management

## API Endpoints

### Public Endpoints
- `GET /api/waitlist/count` - Get total number of signups
- `POST /api/waitlist` - Add email to waitlist

### Admin Endpoints
- `GET /api/admin/waitlist` - Get all waitlist signups with timestamps

## Database Schema

### Waitlist Signups
```sql
CREATE TABLE waitlist_signups (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Shadcn/ui components
│   │   │   └── FlowDashboard.tsx  # Custom dashboard preview
│   │   ├── pages/          # Page components
│   │   │   ├── home.tsx    # Landing page
│   │   │   └── admin.tsx   # Admin dashboard
│   │   ├── lib/            # Utility functions
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express application
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Data access layer
│   ├── routes.ts          # API route handlers
│   └── index.ts           # Server entry point
├── shared/                 # Shared code between client/server
│   └── schema.ts          # Database schema and validation
└── deploy.md              # Deployment instructions
```

## Deployment

The application is configured for deployment on VPS via Dokploy with Nixpacks. See `deploy.md` for detailed deployment instructions.

### Environment Variables for Production
```env
DATABASE_URL=your_production_database_url
NODE_ENV=production
```

## Key Components

### FlowDashboard
Interactive dashboard component showcasing:
- Real-time invoice tracking
- Automated nudge progress indicators  
- Payment analytics and metrics
- Recent activity timeline
- Professional invoice management UI

### Admin Panel
Located at `/admin`, provides:
- Complete list of waitlist signups
- Email addresses with timestamps
- Total signup analytics
- Export capabilities (future feature)

## Design Philosophy

- **Minimalist & Clean** - Focused on essential information without clutter
- **Professional** - Business-appropriate design that builds trust
- **Conversion-Optimized** - Clear value proposition and prominent signup forms
- **Mobile-First** - Responsive design that works on all devices
- **Performance-First** - Optimized loading and interaction speeds

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/scot00671234/flownudger](https://github.com/scot00671234/flownudger)

---

Built with ❤️ for entrepreneurs who want to get paid faster.