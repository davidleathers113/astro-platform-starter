# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands
- Install dependencies: `npm install`
- Development server: `npm run dev` (local) or `netlify dev` (with Netlify features)
- Build: `npm run build`
- Preview build: `npm run preview`
- Typecheck: `tsc --noEmit`
- Run Astro CLI: `npm run astro -- <command>`

## Project Architecture

### Framework and Technologies
- Built with Astro.js (SSG/SSR)
- React components for interactive elements
- Tailwind CSS for styling
- TypeScript for type safety
- Netlify for hosting and platform services

### Core Features
- Theme system (light/dark mode with system detection)
- Netlify Edge Functions for geolocation-based content
- Netlify Blob Store for persistence
- Netlify Image CDN for optimized images

### Theme System
- Uses class-based dark mode strategy with Tailwind
- CSS variables for consistent theming
- System preference detection via `prefers-color-scheme`
- User preferences stored in localStorage
- React context provider available for React components
- Global `themeManager` object for vanilla JS interactions

### Netlify Integration
- Edge Functions in `/netlify/edge-functions/`
- SSR enabled through Astro adapter configuration
- API routes in `/src/pages/api/` use Netlify services
- Requires `netlify dev` for local development of platform features

### Project Structure
- `/src/components/` - Reusable UI components
- `/src/layouts/` - Page layouts and templates
- `/src/pages/` - Routes and API endpoints
- `/src/styles/` - Global CSS and theme variables
- `/public/` - Static assets
- `/netlify/` - Netlify-specific configurations

## Development Notes
- Run `netlify link` to connect local project to Netlify site
- For full functionality locally, use `netlify dev` instead of `npm run dev`
- Node.js v18.14+ is required