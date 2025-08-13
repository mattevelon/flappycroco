# Flappy Croco Game

## Overview

This is a modern web-based implementation of the classic Flappy Bird game, featuring a crocodile character. The project combines both a traditional HTML5 Canvas game version and a React-based version with 3D capabilities. The application is designed for deployment on the Yandex Games platform and includes comprehensive SDK integration for game publishing, ads, and user progress tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**Documentation Update (August 2025)**:
- Created comprehensive README.md with full technical documentation
- Documented all game mechanics, settings, and customization options
- Added API reference for FlappyCrocoGame class and settings system
- Included setup instructions for both standalone and full-stack versions
- Provided troubleshooting guide and development workflow documentation

## System Architecture

### Full-Stack Architecture
The application follows a modern full-stack architecture with clear separation between client and server components:

**Frontend**: React with TypeScript, using Vite as the build tool
**Backend**: Express.js server with TypeScript
**Database**: PostgreSQL with Drizzle ORM for type-safe database operations
**Styling**: TailwindCSS with Radix UI components for consistent design
**3D Graphics**: React Three Fiber for advanced 3D rendering capabilities

### Game Implementation Strategy
The project implements dual game versions to maximize compatibility and feature richness:

1. **Canvas-based Game** (`game.js`, `index.html`): Traditional HTML5 Canvas implementation for broad browser compatibility and Yandex Games platform requirements
2. **React 3D Game** (`client/src/App.tsx`): Modern React-based version with Three.js integration for enhanced visual effects and future extensibility

### State Management
The application uses Zustand for efficient state management with specialized stores:
- **Game State Store**: Manages game phases (ready, playing, ended) with proper state transitions
- **Audio State Store**: Handles sound effects, background music, and mute functionality with user preference persistence

### Platform Integration
Comprehensive Yandex Games SDK integration provides:
- **Authentication**: Optional Yandex ID login with guest play support
- **Advertisement System**: SDK-controlled ad displays for monetization
- **Progress Persistence**: Cloud save functionality for user progress across devices
- **Platform Compliance**: Full adherence to Yandex Games technical requirements including mobile optimization and accessibility

### Database Design
Simple user-centric schema using Drizzle ORM:
- User table with username/password authentication
- Type-safe database operations with automatic schema generation
- Extensible design for future game data storage (scores, achievements, etc.)

### Development Workflow
- **Development**: Vite dev server with hot module replacement
- **Type Safety**: Full TypeScript coverage across client, server, and shared modules
- **Database Management**: Drizzle migrations with push-based schema updates
- **Asset Handling**: Support for game assets including 3D models and audio files

### Mobile and Desktop Optimization
The architecture addresses cross-platform requirements:
- Responsive design with mobile-first approach
- Touch and keyboard input handling
- Screen orientation management
- Performance optimization for various device capabilities

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18 with TypeScript, React Three Fiber for 3D graphics, Radix UI for accessible components
- **Backend Framework**: Express.js with TypeScript support via tsx
- **Build Tools**: Vite for fast development and optimized production builds

### Database and ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle with PostgreSQL adapter for type-safe database operations
- **Migrations**: Drizzle Kit for schema management and database migrations

### Game Development
- **3D Graphics**: Three.js via React Three Fiber and Drei helpers
- **Audio**: HTML5 Audio API with custom audio management layer
- **Input Handling**: Native browser APIs for keyboard, mouse, and touch events

### Platform Integration
- **Yandex Games SDK**: Official SDK for game publishing, ads, authentication, and cloud saves
- **Session Management**: Express sessions with PostgreSQL storage adapter

### Styling and UI
- **CSS Framework**: TailwindCSS for utility-first styling
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Typography**: Inter font via Fontsource for consistent typography

### Development Tools
- **TypeScript**: Full type coverage with strict configuration
- **PostCSS**: CSS processing with TailwindCSS and Autoprefixer
- **Query Management**: TanStack Query for server state management
- **State Management**: Zustand for client-side state with selectors

### Asset Management
- **Font Loading**: Fontsource for web font optimization
- **3D Models**: Support for GLTF/GLB model formats
- **Audio Files**: MP3, OGG, and WAV format support
- **Shader Support**: GLSL shader compilation via Vite plugin