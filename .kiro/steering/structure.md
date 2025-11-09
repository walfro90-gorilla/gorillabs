# Project Structure

## Directory Organization

```
gorillabs/
├── app/                    # Next.js App Router (routes & pages)
├── components/             # React components
├── context/                # React Context providers
├── data/                   # Static JSON data
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, configs, helpers
├── public/                 # Static assets
├── styles/                 # Global styles & design tokens
└── docs/                   # Documentation
```

## App Router Structure

### Public Routes
- `/` - Homepage with visual effects
- `/about` - Company information
- `/blog` - Blog listing and articles
- `/contact` - Contact form
- `/portfolio` - Project showcase
- `/services` - Service listings
- `/services/[id]` - Service detail pages

### Shop Routes (requires auth for cart/checkout)
- `/(shop-layout)/` - Main shop layout group
  - `/cart` - Shopping cart
  - `/checkout` - Checkout process
  - `/order-confirmation` - Order success page

### User Routes (authenticated)
- `/account` - User profile and settings
- `/login` - Authentication page

### Admin Routes (admin role only)
- `/admin` - Admin dashboard
- `/admin/blog` - Blog management
- `/admin/chatbot` - AI chatbot configuration
- `/admin/crm` - Customer relationship management
- `/admin/languages` - i18n content management
- `/admin/portfolio` - Portfolio management
- `/admin/seo` - SEO settings
- `/admin/services` - Service management
- `/admin/website` - General site settings

### API Routes
- `/api/chat` - AI chat endpoint
- Additional API routes as needed

## Component Organization

### `/components`
- **`/ui`** - shadcn/ui base components (Button, Card, Dialog, etc.)
- **`/admin`** - Admin-specific components
- **`/visual-effects`** - Three.js, particles, shaders (use dynamic imports)
- **`/google-maps`** - Map integration components
- **`/ai-showcase`** - AI feature demonstrations
- Root level: Shared components (Header, Footer, Hero, etc.)

## Context Providers

- **`AuthContext`** - User authentication state (Firebase)
- **`CartContext`** - Shopping cart state
- **`LanguageContext`** - i18n language selection

## Library Files (`/lib`)

- **`firebase.ts`** - Firebase configuration & auth helpers
- **`supabase.ts`** - Supabase client setup
- **`gemini-advanced.ts`** - Gemini AI integration
- **`google-maps.ts`** - Google Maps API setup
- **`gsap-config.ts`** - GSAP animation configuration
- **`three-config.ts`** - Three.js setup
- **`dynamic-imports.ts`** - Lazy loading utilities for heavy components
- **`utils.ts`** - General utility functions (cn, etc.)
- **`portfolio.ts`** - Portfolio data helpers
- **`services.ts`** - Services data helpers

## Data Files (`/data`)

- **`portfolio.json`** - Project portfolio data
- **`services.json`** - Service offerings data

## Styling Architecture

### Global Styles
- **`app/globals.css`** - Next.js global styles
- **`styles/globals.css`** - Additional global styles
- **`styles/design-tokens.css`** - CSS custom properties (colors, spacing, typography)

### Design System
- Use CSS variables from design tokens
- Tailwind utility classes for component styling
- `.glass` utility for glassmorphism effects
- Responsive: mobile-first approach with breakpoints (sm, md, lg, xl, 2xl)

## File Naming Conventions

- **Components**: PascalCase (e.g., `Header.tsx`, `UserAvatar.tsx`)
- **Utilities**: kebab-case (e.g., `dynamic-imports.ts`, `use-mobile.ts`)
- **Routes**: kebab-case folders (e.g., `/order-confirmation`, `/admin/chatbot`)
- **Route groups**: parentheses (e.g., `(shop-layout)`)

## Import Patterns

```typescript
// Path alias - always use @/ for imports
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"

// Dynamic imports for heavy components
import { DynamicParticleBackground } from "@/lib/dynamic-imports"
```

## Key Architectural Patterns

1. **Route Protection**: Use middleware or layout-level auth checks for protected routes
2. **Code Splitting**: Heavy visual components must be dynamically imported
3. **Context Composition**: Providers wrap app in `app/layout.tsx` (Theme → Language → Auth → Cart)
4. **Data Fetching**: Server components for static data, client components for interactive features
5. **Bilingual Content**: Use LanguageContext and next-intl for all user-facing text
6. **Performance**: Device detection adjusts visual complexity, respects reduced motion preferences
