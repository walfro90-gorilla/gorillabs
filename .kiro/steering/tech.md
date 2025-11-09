# Tech Stack

## Framework & Core

- **Next.js 15.2.4** (App Router) - React framework with file-based routing
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4** - Utility-first styling

## UI & Styling

- **shadcn/ui** - Radix UI component library (extensive set of components in `components/ui/`)
- **Design Tokens** - CSS custom properties in `styles/design-tokens.css`
- **Framer Motion** - Animations
- **GSAP** - Advanced animations (configured in `lib/gsap-config.ts`)
- **next-themes** - Dark mode support

### Brand Colors
- Gorilla Black: `#000000`
- Gorilla Yellow: `#FFD700`
- Neon accents: Blue (`#00D4E6`), Purple (`#A020F0`), Pink (`#FF1A8C`)

### Glassmorphism
Use `.glass` utility class for frosted glass effects with proper backdrop blur.

## 3D & Visual Effects

- **Three.js** - 3D graphics (configured in `lib/three-config.ts`)
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers
- **Dynamic imports required** - Use utilities from `lib/dynamic-imports.ts` to lazy-load heavy components

## Backend & Data

- **Firebase** - Authentication, real-time database (configured in `lib/firebase.ts`)
- **Supabase** - Alternative database option (configured in `lib/supabase.ts`)
- **Google Maps API** - Location services (configured in `lib/google-maps.ts`)
- **Gemini AI** - AI chat integration (configured in `lib/gemini-advanced.ts`)

## Forms & Validation

- **react-hook-form** - Form management
- **zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

## Internationalization

- **next-intl** - i18n support (Spanish/English)
- **LanguageContext** - Global language state management

## Development Tools

- **Monaco Editor** - Code editor component
- **Sandpack** - Interactive code demos

## Common Commands

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Important Configuration Notes

- **Build errors ignored** - `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true` in next.config.mjs
- **Image optimization** - Remote patterns allow all HTTPS images, supports AVIF/WebP
- **Bundle optimization** - Package imports optimized for lucide-react, Radix UI, recharts, Three.js
- **Path aliases** - `@/*` maps to project root
- **SSR disabled** - Three.js and Monaco components must use `ssr: false` in dynamic imports

## Performance Patterns

1. **Heavy components** - Always use dynamic imports from `lib/dynamic-imports.ts`
2. **Device detection** - Use `detectDevicePerformance()` to adjust visual complexity
3. **Reduced motion** - Respect `prefers-reduced-motion` media query
4. **WebGL check** - Use `isWebGLSupported()` before rendering 3D content
