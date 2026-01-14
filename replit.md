# Hijabrn Skin Analyst

## Overview

Hijabrn Skin Analyst is a beauty technology web application that analyzes skin undertones through camera-based image capture and provides personalized hijab color recommendations. The application uses RGB color analysis to classify skin as warm, cool, or neutral undertones, then matches users with complementary hijab colors across three categories: dark, pastel, and brown tones. Users can add recommendations to a shopping cart and purchase directly through Shopee integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool and development server.

**UI Component System**: shadcn/ui components built on Radix UI primitives, providing accessible, customizable components with a consistent design system. The application uses a "new-york" style variant with custom color theming.

**Styling**: Tailwind CSS with custom design tokens defined through CSS variables. The design system emphasizes beauty tech aesthetics with careful attention to typography (Poppins for body text, Playfair Display for headlines), spacing primitives, and cultural sensitivity for the hijab-wearing community.

**State Management**: React hooks for local component state, with a simple state machine pattern managing the application flow through four distinct phases: welcome → camera → results → cart.

**Routing**: Wouter for lightweight client-side routing, though the application is primarily single-page with state-driven view transitions.

**Image Processing**: Browser-native Canvas API for capturing and analyzing webcam images, calculating average RGB values from captured pixels to determine skin undertone.

### Backend Architecture

**Server Framework**: Express.js running on Node.js, configured as an ESM module.

**Development Setup**: Vite middleware integration for hot module replacement during development, with custom logging middleware for API request tracking.

**Data Storage Strategy**: Currently implements an in-memory storage interface (`MemStorage`) with a defined `IStorage` contract. This abstraction allows for future migration to persistent storage without changing application logic.

**Skin Analysis Algorithm**: Client-side algorithm uses a predefined dataset of 20 skin tone samples with RGB values and undertone classifications. The system:
1. Classifies undertone based on RGB thresholds (R > 180 = Warm, B > 170 = Cool, else Neutral)
2. Finds the closest match in the dataset using Euclidean distance in RGB color space
3. Returns three hijab color recommendations (dark, pastel, brown tones) with hex color codes

### External Dependencies

**Database**: PostgreSQL via Neon serverless driver (`@neondatabase/serverless`) with Drizzle ORM for type-safe database operations. Schema currently defines a users table, though authentication is not yet implemented.

**UI Libraries**: 
- Radix UI primitives for accessible component foundations
- Embla Carousel for potential carousel implementations
- Lucide React for iconography

**Form Handling**: React Hook Form with Zod resolvers for type-safe form validation (infrastructure present but not actively used in current implementation).

**Query Management**: TanStack React Query for server state management, configured with custom fetch wrappers and error handling.

**Third-Party Services**: 
- Shopee e-commerce platform for product purchases (integrated via direct URL linking with search parameters)
- Browser MediaDevices API for camera access

### Design System

**Color Theming**: HSL-based color system with CSS custom properties supporting light/dark modes. Primary color is pink (#e91e63 range) aligned with beauty tech branding. Uses computed border colors and elevation layers for depth.

**Typography Hierarchy**: 
- Display: Playfair Display (serif, for elegance)
- Body: Poppins (sans-serif, for readability)
- Mono: Fira Code (for code/technical content)

**Responsive Design**: Mobile-first approach with Tailwind breakpoints, custom mobile detection hook for adaptive UI behavior.

**Animation Strategy**: CSS transitions for interactive elements, typing animation effect for welcome screen, progressive disclosure patterns to guide users through the analysis flow.

### Security Considerations

**Camera Privacy**: Requests user permission for camera access, captures and analyzes images client-side only (no server transmission of biometric data).

**Session Management**: Infrastructure for express-session with PostgreSQL store (`connect-pg-simple`) is present but not actively configured.

**Input Validation**: Zod schemas defined for user data validation, though authentication flows are not implemented.

### Build and Deployment

**Production Build**: Vite builds the frontend to `dist/public`, esbuild bundles the server to `dist/index.js` as ESM with external package handling.

**Development Workflow**: Concurrent execution of Vite dev server with Express backend proxy, hot module replacement enabled for rapid iteration.

**Database Migrations**: Drizzle Kit manages schema migrations with PostgreSQL dialect, migrations output to `./migrations` directory.