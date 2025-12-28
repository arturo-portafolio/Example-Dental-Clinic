# BrightSmile Dental - Project Guide

## Overview

BrightSmile Dental is a modern, responsive web application for a fictional dental clinic. The site provides comprehensive information about dental services, team members, promotions, FAQs, and contact functionality. It features a public-facing website with an admin panel for content management.

**Key Characteristics:**
- Full-stack TypeScript application
- React frontend with Express backend
- In-memory data storage (no persistent database in current implementation)
- Designed for deployment on Vercel
- All content in English only

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and element animations
- **SEO**: React Helmet Async for document head management
- **Forms**: React Hook Form with Zod validation

**Component Structure:**
- `client/src/components/` - Reusable components (Navigation, Footer, Layout, ServiceCard, WhatsAppButton)
- `client/src/components/ui/` - shadcn/ui primitives (buttons, cards, forms, dialogs, etc.)
- `client/src/pages/` - Route pages (Home, Services, Team, Promotions, Gallery, FAQ, Contact, Admin)
- `client/src/hooks/` - Custom hooks for data fetching and utilities
- `client/src/lib/` - Utility functions and query client configuration

**Design Decisions:**
- Fixed header navigation with responsive hamburger menu for mobile
- Floating WhatsApp button for quick contact
- Card-based layouts for services and team members
- Before/after gallery for showcasing results

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints defined in `shared/routes.ts`
- **Data Layer**: In-memory storage implementing IStorage interface
- **Schema**: Drizzle ORM schemas (prepared for future database connection)

**API Endpoints:**
- `/api/services` - CRUD for dental services
- `/api/team` - Team member management
- `/api/promotions` - Promotional offers
- `/api/faqs` - FAQ management
- `/api/gallery` - Before/after gallery items
- `/api/messages` - Contact form submissions
- `/api/admin/login` - Admin authentication

**Storage Pattern:**
The `MemStorage` class in `server/storage.ts` implements the `IStorage` interface with in-memory Maps. This allows the application to function without a database while maintaining the architecture for future database integration.

### Shared Code
- `shared/schema.ts` - Drizzle ORM table definitions and Zod schemas
- `shared/routes.ts` - API route definitions with input/output schemas

### Build System
- **Development**: Vite dev server with HMR
- **Production Build**: Custom build script using esbuild for server and Vite for client
- **Output**: `dist/` directory with bundled server and static client files

## External Dependencies

### UI Framework
- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, tabs, etc.)
- **Lucide React**: Icon library

### Data & Forms
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management
- **Zod**: Schema validation for forms and API inputs
- **Drizzle ORM**: Database schema definitions (prepared for PostgreSQL)

### Database (Future)
- Schema configured for PostgreSQL via Drizzle
- `DATABASE_URL` environment variable expected when database is connected
- Currently uses in-memory storage as placeholder

### Development Tools
- **Vite**: Frontend build tool with React plugin
- **TSX**: TypeScript execution for development
- **Drizzle Kit**: Database migration tooling

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (optional in current demo mode)
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` - Admin panel credentials (environment-based)

### Fonts
- Google Fonts: DM Sans (body), Outfit (display)