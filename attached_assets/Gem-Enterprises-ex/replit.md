# Overview

GEM Assist Enterprise is a comprehensive professional security and trust services platform that combines cybersecurity expertise with real estate services through a strategic partnership with Alliance Trust Realty LLC. The platform provides 24/7 threat monitoring, Telegram automation, investment portfolio management, legal services, and real estate solutions. Built as a modern web application with React frontend and Express backend, it features a professional dark theme design inspired by enterprise cybersecurity leaders like CrowdStrike and Palo Alto Networks.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with a simple, lightweight approach
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent design system
- **State Management**: TanStack Query (React Query) for server state management with custom query client configuration
- **Theme System**: Custom React Context-based theme provider supporting light/dark modes with localStorage persistence
- **Component Structure**: Modular component architecture with reusable UI components, page components, and specialized business components

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM module system
- **Database ORM**: Drizzle ORM with PostgreSQL database support via Neon serverless
- **API Design**: RESTful API structure with dedicated route handlers
- **Session Management**: Express session handling with PostgreSQL session store
- **Development Tools**: Hot module replacement via Vite integration in development mode

## Database Schema
- **ORM**: Drizzle ORM with schema-first approach
- **Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle migrations with schema definitions in shared directory
- **User Management**: Basic user schema with UUID primary keys, username/password authentication

## Authentication & Security
- **User Authentication**: Username/password based authentication with session management
- **Session Storage**: PostgreSQL-backed session storage using connect-pg-simple
- **Security Headers**: CORS and security middleware configuration
- **Environment Variables**: Secure configuration management for database URLs and API keys

## External Integrations
- **Notion API**: Leadership team data and company history integration via official Notion client
- **SendGrid**: Email service integration for transactional emails and notifications
- **Asset Management**: Static asset serving with image optimization and CDN-ready structure

## Design System
- **Color Palette**: Professional dark theme with navy blue primary (210 100% 50%), security green accents (142 76% 36%), and high contrast ratios
- **Typography**: Inter font family from Google Fonts with consistent weight hierarchy
- **Component Library**: shadcn/ui providing accessible, customizable components built on Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Icon System**: Lucide React icons for consistent iconography throughout the application

## Development Environment
- **Build System**: Vite for fast development and optimized production builds
- **Development Server**: Express with Vite middleware integration for hot reloading
- **TypeScript**: Strict TypeScript configuration with path mapping for clean imports
- **Code Quality**: ESLint and TypeScript compiler checks with import alias support

# External Dependencies

## Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod validation
- **UI Framework**: Tailwind CSS with shadcn/ui component library built on Radix UI primitives
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Icons**: Lucide React for consistent iconography
- **Utilities**: clsx and tailwind-merge for conditional styling, class-variance-authority for component variants

## Backend Dependencies
- **Web Framework**: Express.js with TypeScript support via tsx runtime
- **Database**: Drizzle ORM with Neon PostgreSQL serverless database
- **Session Management**: express-session with connect-pg-simple for PostgreSQL session storage
- **Email Service**: SendGrid official SDK for transactional email capabilities
- **Development Tools**: Vite for development server integration and asset bundling

## External Services
- **Database Hosting**: Neon PostgreSQL serverless database with connection pooling
- **Content Management**: Notion API integration for dynamic content and team data
- **Email Delivery**: SendGrid for reliable email delivery and templates
- **Font Services**: Google Fonts for Inter and other typography assets
- **Development Platform**: Replit-specific integrations for development environment support

## Build & Deployment
- **Package Manager**: npm with lockfile for dependency management
- **Build Tool**: Vite for optimized production builds with code splitting
- **TypeScript Compilation**: esbuild for fast server-side compilation
- **Asset Optimization**: Vite's built-in asset optimization and bundling
- **Environment Configuration**: Environment variable based configuration for different deployment stages