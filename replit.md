# Overview

This is a full-stack waitlist application built with React, Express.js, and PostgreSQL. The application allows users to sign up for a waitlist through a modern landing page interface and provides an API to manage waitlist entries. The frontend features a clean, professional landing page with sections for benefits, how it works, and FAQ. The application is configured for deployment on VPS via Dokploy with Nixpacks, using a real PostgreSQL database to collect and store email addresses.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **UI Components**: Comprehensive shadcn/ui component system including forms, dialogs, toasts, and layout components

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development Server**: Custom Vite integration for hot module replacement in development
- **API Structure**: RESTful API with dedicated routes for waitlist management
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Request Logging**: Custom middleware for API request logging and performance monitoring

## Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Management**: Drizzle Kit for database migrations and schema changes
- **Database**: PostgreSQL with Neon serverless database connection
- **Connection**: Environment-based database URL configuration with connection pooling

## Data Models
- **Users Table**: Basic user authentication structure (id, username, password)
- **Waitlist Signups**: Email-based waitlist with timestamps and unique constraints
- **Type Safety**: Zod schemas for runtime validation matching database schema

## Storage Abstraction
- **Interface Pattern**: IStorage interface for database operations abstraction
- **Implementation**: DatabaseStorage using PostgreSQL via Drizzle ORM for production
- **Operations**: CRUD operations for users and waitlist management with duplicate prevention
- **Admin Interface**: `/admin` route provides view of all waitlist signups with analytics

## Development Workflow
- **Hot Reloading**: Vite dev server integration with Express for seamless development
- **Type Checking**: Comprehensive TypeScript configuration across client, server, and shared code
- **Path Aliases**: Configured import paths for cleaner code organization (@/, @shared/, @assets/)
- **Build Process**: Separate build processes for client (Vite) and server (esbuild) with proper bundling

## Security & Validation
- **Input Validation**: Zod schemas for email validation and data sanitization
- **Type Safety**: End-to-end TypeScript coverage from database to frontend
- **Environment Variables**: Secure configuration management for database connections

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting with connection pooling
- **Connection Library**: @neondatabase/serverless for optimized serverless database connections

## UI Framework
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (@radix-ui/react-*)
- **Lucide React**: Icon library for consistent iconography throughout the application
- **Tailwind CSS**: Utility-first CSS framework with custom design system configuration

## Development Tools
- **Vite**: Frontend build tool with React plugin and custom server integration
- **Replit Integration**: Development environment plugins for enhanced Replit experience
- **TypeScript**: Static type checking across the entire application stack

## Form & Validation
- **React Hook Form**: Performant forms with easy validation integration
- **Zod**: Schema validation library for runtime type checking and form validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

## Server Libraries
- **Express.js**: Web application framework with middleware support
- **Drizzle ORM**: Modern TypeScript ORM with PostgreSQL support
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage

## Utility Libraries
- **Date-fns**: Modern JavaScript date utility library
- **Class Variance Authority**: Utility for creating variant-based component APIs
- **CLSX & Tailwind Merge**: Conditional className utilities for dynamic styling