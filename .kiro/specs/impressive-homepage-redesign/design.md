# Design Document

## Overview

Este documento detalla el diseño técnico para transformar la homepage de Gorilla Labs en una experiencia web de última generación. La solución implementará efectos visuales avanzados usando Three.js y WebGL, demostraciones interactivas con editores de código en vivo, micro-interacciones fluidas con GSAP, y un sistema de IA predictiva que personaliza la experiencia del usuario.

El diseño prioriza el rendimiento mediante lazy loading, code splitting y progressive enhancement, asegurando que la experiencia sea impresionante sin sacrificar velocidad de carga o accesibilidad.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Homepage (page.tsx)                     │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Visual Effects Layer (Three.js/WebGL)          │ │
│  │  - 3D Particle System                                  │ │
│  │  - Shader-based Gradients                              │ │
│  │  - Parallax Effects                                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Content Sections (Lazy Loaded)            │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Enhanced Hero Section                           │  │ │
│  │  │  - Glassmorphism UI                              │  │ │
│  │  │  - Animated Gradient Background                  │  │ │
│  │  │  - Typing Animation                              │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Tech Stack Showcase                             │  │ │
│  │  │  - Interactive Code Demos                        │  │ │
│  │  │  - Live Code Editor (Monaco/CodeMirror)          │  │ │
│  │  │  - Real-time Execution                           │  │ │
│  │  │  - Performance Metrics Display                   │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Case Studies Section                            │  │ │
│  │  │  - Animated Data Visualizations (Recharts)       │  │ │
│  │  │  - Counter Animations (GSAP)                     │  │ │
│  │  │  - Before/After Comparisons                      │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Technologies Grid                               │  │ │
│  │  │  - 3D Logo Animations                            │  │ │
│  │  │  - Interactive Tooltips                          │  │ │
│  │  │  - Category Filtering                            │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                         │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  AI Project Estimator                            │  │ │
│  │  │  - Interactive Form                              │  │ │
│  │  │  - Real-time Price Calculation                   │  │ │
│  │  │  - Contextual Suggestions                        │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Micro-interactions Layer (GSAP)                │ │
│  │  - Scroll Animations                                   │ │
│  │  - Hover Effects                                       │ │
│  │  - Entrance Animations                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         AI Context System                              │ │
│  │  - User Behavior Tracking                              │ │
│  │  - Contextual Suggestions                              │ │
│  │  - Personalization Engine                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Core Framework:**
- Next.js 15 (App Router)
- React 19
- TypeScript

**Visual Effects:**
- Three.js (3D graphics and particle systems)
- @react-three/fiber (React renderer for Three.js)
- @react-three/drei (Three.js helpers)
- WebGL shaders (custom GLSL)

**Animations:**
- GSAP (GreenSock Animation Platform)
- Framer Motion (existing, for simpler animations)

**Code Demos:**
- Monaco Editor or CodeMirror (live code editing)
- Sandpack (code execution sandbox)

**Data Visualization:**
- Recharts (existing)
- D3.js (for custom visualizations)

**Performance:**
- React.lazy + Suspense
- Next.js dynamic imports
- Intersection Observer API

## Components and Interfaces

### 1. Visual Effects System

#### ParticleBackground Component

```typescript
interface ParticleBackgroundProps {
  particleCount?: number;
  particleSize?: number;
  particleColor?: string;
  animationSpeed?: number;
  enableParallax?: boolean;
}

// Location: components/visual-effects/particle-background.tsx
// Uses Three.js to render animated particles
// Implements performance monitoring to adjust particle count
// Responds to scroll for parallax effects
```

#### ShaderGradient Component

```typescript
interface ShaderGradientProps {
  colors: string[];
  animationSpeed?: number;
  blendMode?: 'normal' | 'multiply' | 'screen';
}

// Location: components/visual-effects/shader-gradient.tsx
// Custom WebGL shader for animated gradients
// Fallback to CSS gradients if WebGL unavailable
```

#### GlassmorphicCard Component

```typescript
interface GlassmorphicCardProps {
  children: React.ReactNode;
  blur?: number;
  opacity?: number;
  borderGlow?: boolean;
  className?: string;
}

// Location: components/ui/glassmorphic-card.tsx
// Reusable card with glassmorphism effect
// Uses backdrop-filter CSS property
// Animated border glow on hover
```

### 2. Tech Stack Showcase

#### InteractiveDemo Component

```typescript
interface InteractiveDemoProps {
  technology: {
    name: string;
    icon: string;
    category: string;
    defaultCode: string;
    language: 'javascript' | 'typescript' | 'python' | 'html';
  };
  onExecute?: (code: string) => Promise<ExecutionResult>;
}

interface ExecutionResult {
  output: string;
  executionTime: number;
  memoryUsage?: number;
  error?: string;
}

// Location: components/tech-showcase/interactive-demo.tsx
// Expandable card with code editor
// Real-time code execution
// Performance metrics display
```

#### CodeEditor Component

```typescript
interface CodeEditorProps {
  initialCode: string;
  language: string;
  onChange: (code: string) => void;
  onRun: () => void;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
}

// Location: components/tech-showcase/code-editor.tsx
// Monaco Editor integration
// Syntax highlighting
// Auto-completion
```

#### TechStackGrid Component

```typescript
interface Technology {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'devops';
  expertiseLevel: number; // 1-5
  projectCount: number;
  demoCode?: string;
}

interface TechStackGridProps {
  technologies: Technology[];
  onTechClick?: (tech: Technology) => void;
  filterCategory?: string;
}

// Location: components/tech-showcase/tech-stack-grid.tsx
// Grid of technology logos
// 3D rotation animations on scroll
// Category filtering
// Links to portfolio projects
```

### 3. Case Studies Section

#### CaseStudyCard Component

```typescript
interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  image: string;
  metrics: {
    label: string;
    value: number;
    unit: string;
    icon: string;
  }[];
  beforeAfter?: {
    before: string;
    after: string;
  };
  technologies: string[];
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onHover?: () => void;
}

// Location: components/case-studies/case-study-card.tsx
// Animated metrics counters
// Before/after image comparison
// Hover reveal effects
```

#### AnimatedCounter Component

```typescript
interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  onComplete?: () => void;
}

// Location: components/animations/animated-counter.tsx
// GSAP-powered number animation
// Triggers when visible in viewport
// Easing functions for smooth counting
```

#### DataVisualization Component

```typescript
interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface DataVisualizationProps {
  data: DataPoint[];
  type: 'bar' | 'line' | 'pie' | 'area';
  animated?: boolean;
  height?: number;
}

// Location: components/case-studies/data-visualization.tsx
// Recharts integration
// Entrance animations
// Responsive sizing
```

### 4. AI Project Estimator

#### ProjectEstimator Component

```typescript
interface ProjectRequirement {
  category: 'web' | 'mobile' | 'ecommerce' | 'ai' | 'custom';
  features: string[];
  complexity: 'simple' | 'medium' | 'complex';
  timeline?: string;
}

interface EstimateResult {
  basePrice: number;
  totalPrice: number;
  breakdown: {
    item: string;
    cost: number;
  }[];
  timelineEstimate: string;
  recommendations: string[];
}

interface ProjectEstimatorProps {
  onEstimateComplete?: (estimate: EstimateResult) => void;
}

// Location: components/ai-estimator/project-estimator.tsx
// Multi-step form
// Real-time price calculation
// AI-powered recommendations
```

#### ContextualSuggestions Component

```typescript
interface Suggestion {
  id: string;
  title: string;
  description: string;
  action: () => void;
  relevanceScore: number;
}

interface ContextualSuggestionsProps {
  currentSection: string;
  userBehavior: UserBehaviorData;
  onSuggestionClick?: (suggestion: Suggestion) => void;
}

// Location: components/ai-estimator/contextual-suggestions.tsx
// Tracks user scroll position and time spent
// Displays relevant suggestions
// Smooth entrance/exit animations
```

### 5. Animation System

#### ScrollAnimationWrapper Component

```typescript
interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animation: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  threshold?: number; // Intersection Observer threshold
}

// Location: components/animations/scroll-animation-wrapper.tsx
// GSAP ScrollTrigger integration
// Intersection Observer for performance
// Staggered animations for child elements
```

#### MicroInteraction Component

```typescript
interface MicroInteractionProps {
  children: React.ReactNode;
  type: 'hover' | 'click' | 'focus';
  effect: 'scale' | 'glow' | 'shake' | 'pulse' | 'ripple';
  intensity?: number;
}

// Location: components/animations/micro-interaction.tsx
// Reusable interaction effects
// GSAP-powered animations
// Customizable intensity
```

## Data Models

### User Behavior Tracking

```typescript
interface UserBehaviorData {
  sessionId: string;
  visitedSections: {
    sectionId: string;
    timeSpent: number; // milliseconds
    scrollDepth: number; // percentage
    interactions: number;
  }[];
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    previousVisits: number;
  };
  interests: string[]; // Inferred from behavior
  timestamp: Date;
}
```

### Technology Data

```typescript
interface TechnologyData {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'devops';
  description: string;
  expertiseLevel: 1 | 2 | 3 | 4 | 5;
  projectCount: number;
  demoCode: {
    language: string;
    code: string;
    description: string;
  };
  relatedProjects: string[]; // Project IDs
}
```

### Performance Metrics

```typescript
interface PerformanceMetrics {
  fps: number;
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  particleCount: number;
  memoryUsage?: number;
}
```

## Error Handling

### Visual Effects Fallbacks

1. **WebGL Not Supported:**
   - Detect WebGL support on component mount
   - Fallback to CSS-based animations
   - Display simplified particle effects using CSS
   - Log warning to console for debugging

2. **Performance Issues:**
   - Monitor FPS using requestAnimationFrame
   - If FPS drops below 30, reduce particle count by 50%
   - If FPS still below 30, disable particle system
   - Show performance warning to user (optional)

3. **Three.js Load Failure:**
   - Wrap Three.js components in Error Boundary
   - Display static gradient background as fallback
   - Log error to analytics service
   - Continue with rest of page functionality

### Code Execution Errors

1. **Syntax Errors:**
   - Catch and display in output panel
   - Highlight error line in editor
   - Provide helpful error messages
   - Suggest fixes when possible

2. **Runtime Errors:**
   - Sandbox execution environment
   - Timeout after 5 seconds
   - Display error message with stack trace
   - Prevent infinite loops

3. **Network Errors:**
   - Retry failed requests up to 3 times
   - Display user-friendly error message
   - Provide offline fallback content
   - Cache successful responses

### AI Estimator Errors

1. **Invalid Input:**
   - Validate form fields in real-time
   - Display inline error messages
   - Prevent form submission until valid
   - Provide example inputs

2. **Calculation Errors:**
   - Fallback to base pricing model
   - Log error for investigation
   - Display approximate estimate
   - Offer manual consultation option

## Testing Strategy

### Unit Tests

**Visual Effects Components:**
- Test particle system initialization
- Verify fallback behavior when WebGL unavailable
- Test performance monitoring logic
- Verify cleanup on component unmount

**Animation Components:**
- Test GSAP animation triggers
- Verify Intersection Observer setup
- Test animation timing and easing
- Verify scroll-based animations

**Code Editor:**
- Test code execution sandbox
- Verify syntax highlighting
- Test error handling
- Verify performance metrics calculation

**AI Estimator:**
- Test price calculation logic
- Verify form validation
- Test recommendation engine
- Verify real-time updates

### Integration Tests

**User Flow Tests:**
- Test complete scroll through homepage
- Verify all sections load correctly
- Test interaction between components
- Verify mobile responsiveness

**Performance Tests:**
- Measure FPS during animations
- Test load time with slow 3G
- Verify lazy loading behavior
- Test memory usage over time

**Cross-browser Tests:**
- Test in Chrome, Firefox, Safari, Edge
- Verify WebGL support detection
- Test fallback behaviors
- Verify mobile browser compatibility

### E2E Tests

**Critical User Journeys:**
1. First-time visitor experience
2. Scrolling through all sections
3. Interacting with code demos
4. Using project estimator
5. Viewing case studies

**Performance Benchmarks:**
- Lighthouse score > 90
- FCP < 1.5s
- LCP < 2.5s
- CLS < 0.1
- FPS > 55 during animations

### Accessibility Tests

**WCAG 2.1 AA Compliance:**
- Keyboard navigation for all interactive elements
- Screen reader compatibility
- Color contrast ratios
- Focus indicators
- Alt text for images
- ARIA labels where needed

**Motion Preferences:**
- Respect prefers-reduced-motion
- Provide option to disable animations
- Ensure content accessible without animations

## Performance Optimization

### Code Splitting Strategy

```typescript
// Lazy load heavy components
const ParticleBackground = dynamic(
  () => import('@/components/visual-effects/particle-background'),
  { ssr: false, loading: () => <div className="h-screen bg-black" /> }
);

const TechStackShowcase = dynamic(
  () => import('@/components/tech-showcase/tech-stack-grid'),
  { loading: () => <SkeletonLoader /> }
);

const CodeEditor = dynamic(
  () => import('@/components/tech-showcase/code-editor'),
  { ssr: false }
);
```

### Asset Optimization

1. **Images:**
   - Use Next.js Image component
   - WebP format with JPEG fallback
   - Lazy load below-the-fold images
   - Responsive image sizes

2. **3D Assets:**
   - Compress geometry data
   - Use texture atlases
   - Implement LOD (Level of Detail)
   - Lazy load 3D models

3. **Fonts:**
   - Subset fonts to required characters
   - Use font-display: swap
   - Preload critical fonts
   - Self-host fonts

### Caching Strategy

1. **Static Assets:**
   - Cache-Control: public, max-age=31536000
   - Immutable for hashed assets
   - Service Worker for offline support

2. **API Responses:**
   - Cache project data for 1 hour
   - Cache technology data for 24 hours
   - Revalidate on focus
   - Background refresh

3. **User Data:**
   - LocalStorage for preferences
   - SessionStorage for behavior tracking
   - IndexedDB for large datasets

### Progressive Enhancement

1. **Core Content First:**
   - Load HTML and critical CSS immediately
   - Display text content before JavaScript
   - Enhance with animations after load
   - Ensure functionality without JS

2. **Feature Detection:**
   - Check WebGL support
   - Check Intersection Observer support
   - Check backdrop-filter support
   - Provide appropriate fallbacks

3. **Adaptive Loading:**
   - Detect connection speed
   - Reduce quality on slow connections
   - Skip heavy animations on low-end devices
   - Respect data-saver mode

## UI/UX Best Practices

### Mobile-First Design Principles

**Touch Interactions:**
- Minimum touch target: 48x48px (WCAG AAA standard)
- Touch targets spaced at least 8px apart
- Swipe gestures for carousels with visual indicators
- Pull-to-refresh disabled to prevent accidental triggers
- Prevent zoom on double-tap for app-like experience
- Haptic feedback for important actions (where supported)
- Long-press for contextual menus
- Gesture hints for first-time users

**Thumb-Friendly Zones:**
- Primary CTAs in bottom third of screen (thumb zone)
- Navigation accessible with one hand
- Important actions within easy reach
- Avoid placing critical buttons in top corners
- Floating action buttons for primary actions

**Performance Adjustments:**
- Reduce particle count to 200 on mobile (vs 1000 on desktop)
- Disable complex shaders on devices with < 4GB RAM
- Use CSS animations instead of GSAP on low-end devices
- Lazy load more aggressively (load on 50% visibility vs 10%)
- Reduce image quality by 20% on mobile
- Implement adaptive bitrate for videos
- Defer non-critical JavaScript

**Layout Adaptations:**
- Single column layout for content
- Larger text sizes (minimum 16px for body text)
- Increased line height (1.6 for readability)
- Simplified navigation (hamburger menu)
- Bottom-sheet modals instead of center modals
- Sticky CTAs that don't obstruct content
- Collapsible sections to reduce scrolling
- Card-based layouts for scanability

### Desktop Experience Enhancements

**Advanced Interactions:**
- Keyboard shortcuts for power users
- Hover states with smooth transitions
- Cursor changes to indicate interactivity
- Drag-and-drop where applicable
- Multi-column layouts for efficiency
- Sidebar navigation always visible
- Tooltips with rich content
- Context menus on right-click

**Screen Real Estate:**
- Utilize wider viewports effectively
- Side-by-side comparisons
- Multi-panel layouts
- Persistent navigation
- Larger, more detailed visualizations
- More content above the fold

### Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base styles: 320px - 639px (mobile) */

/* Small tablets: 640px - 767px */
@media (min-width: 640px) { }

/* Tablets: 768px - 1023px */
@media (min-width: 768px) { }

/* Small laptops: 1024px - 1279px */
@media (min-width: 1024px) { }

/* Desktops: 1280px - 1535px */
@media (min-width: 1280px) { }

/* Large desktops: 1536px+ */
@media (min-width: 1536px) { }
```

### Visual Hierarchy

**Typography Scale:**
```css
/* Mobile */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Desktop (scale up by 1.2x) */
--text-xs: 0.875rem;   /* 14px */
--text-sm: 1rem;       /* 16px */
--text-base: 1.125rem; /* 18px */
--text-lg: 1.25rem;    /* 20px */
--text-xl: 1.5rem;     /* 24px */
--text-2xl: 1.875rem;  /* 30px */
--text-3xl: 2.25rem;   /* 36px */
--text-4xl: 3rem;      /* 48px */
```

**Spacing System:**
- Consistent 8px base unit
- Mobile: 16px, 24px, 32px, 48px
- Desktop: 24px, 32px, 48px, 64px, 96px
- Section padding: 48px mobile, 96px desktop

**Color Contrast:**
- Minimum 4.5:1 for normal text (WCAG AA)
- Minimum 3:1 for large text
- Minimum 3:1 for UI components
- Test with color blindness simulators
- Provide high contrast mode option

### Loading States & Feedback

**Skeleton Screens:**
- Show content structure while loading
- Animate skeleton to indicate progress
- Match skeleton to actual content layout
- Avoid jarring layout shifts

**Progress Indicators:**
- Determinate progress bars when possible
- Indeterminate spinners for unknown duration
- Percentage display for long operations
- Cancel option for lengthy processes

**Micro-feedback:**
- Button press states (active, disabled)
- Form validation in real-time
- Success/error messages with icons
- Toast notifications for background actions
- Optimistic UI updates

### Accessibility Enhancements

**Keyboard Navigation:**
- Logical tab order
- Skip to main content link
- Focus visible indicators (3px outline)
- Escape key closes modals
- Arrow keys for carousels
- Enter/Space for buttons

**Screen Reader Support:**
- Semantic HTML elements
- ARIA labels for custom components
- ARIA live regions for dynamic content
- Alt text for all images
- Descriptive link text (no "click here")
- Form labels properly associated

**Motion & Animation:**
- Respect prefers-reduced-motion
- Provide toggle to disable animations
- No auto-playing videos with sound
- Pause/stop controls for animations
- No flashing content (seizure risk)

### Content Strategy

**Scanability:**
- Clear headings hierarchy (H1 → H6)
- Short paragraphs (3-4 lines max)
- Bullet points for lists
- Bold key information
- White space for breathing room
- Visual breaks between sections

**Progressive Disclosure:**
- Show essential info first
- "Read more" for detailed content
- Expandable sections
- Tooltips for additional context
- Modals for complex interactions

**Call-to-Actions:**
- Primary CTA per section (one clear action)
- Contrasting colors for CTAs
- Action-oriented text ("Start Building" vs "Submit")
- Visible without scrolling (above fold)
- Repeated at logical points
- Mobile: sticky bottom CTA

### Error Prevention & Recovery

**Form Design:**
- Inline validation as user types
- Clear error messages with solutions
- Prevent errors before they happen
- Save progress automatically
- Confirm destructive actions
- Provide undo option

**Error Messages:**
- Human-readable language
- Explain what went wrong
- Suggest how to fix it
- Provide contact option if stuck
- Log errors for debugging

### Performance Perception

**Perceived Performance:**
- Show content immediately (SSR)
- Skeleton screens while loading
- Optimistic UI updates
- Instant feedback on interactions
- Smooth 60fps animations
- No janky scrolling

**Actual Performance:**
- Lighthouse score > 90
- FCP < 1.5s
- LCP < 2.5s
- TTI < 3.5s
- CLS < 0.1
- FID < 100ms

### Cross-Platform Consistency

**Brand Consistency:**
- Same color palette across devices
- Consistent typography
- Unified voice and tone
- Recognizable components
- Predictable interactions

**Platform Conventions:**
- iOS: Bottom tab bar, swipe gestures
- Android: Material Design patterns
- Web: Standard web conventions
- Respect platform expectations

## Design System Integration

### Color Palette (WCAG AA Compliant)

```css
/* Existing Gorilla Labs colors */
--gorilla-black: #000000;
--gorilla-yellow: #FFD700;

/* New accent colors for effects (adjusted for accessibility) */
--neon-blue: #00D4E6;      /* 4.5:1 contrast on dark bg */
--neon-purple: #A020F0;    /* 4.5:1 contrast on dark bg */
--neon-pink: #FF1A8C;      /* 4.5:1 contrast on dark bg */

/* Glassmorphism */
--glass-bg: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.2);
--glass-shadow: rgba(0, 0, 0, 0.1);
--glass-blur: 12px;

/* Semantic colors */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;

/* Text colors with proper contrast */
--text-primary: #FFFFFF;        /* On dark backgrounds */
--text-secondary: #A0A0A0;      /* Muted text */
--text-primary-light: #000000;  /* On light backgrounds */
--text-secondary-light: #6B7280;
```

### Typography System

**Font Families:**
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-code: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
--font-display: 'Inter', sans-serif; /* For headings */
```

**Fluid Typography (Mobile to Desktop):**
```css
/* Automatically scales between breakpoints */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);
--text-3xl: clamp(1.875rem, 1.65rem + 1.125vw, 2.25rem);
--text-4xl: clamp(2.25rem, 1.95rem + 1.5vw, 3rem);
--text-5xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);
```

**Line Heights:**
```css
--leading-tight: 1.25;   /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Long-form content */
```

**Font Weights:**
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing System (8px base unit)

**Mobile Spacing:**
```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
```

**Desktop Spacing:**
```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 2rem;     /* 32px */
--space-lg: 3rem;     /* 48px */
--space-xl: 4rem;     /* 64px */
--space-2xl: 6rem;    /* 96px */
--space-3xl: 8rem;    /* 128px */
```

**Section Padding:**
- Mobile: 48px vertical, 16px horizontal
- Tablet: 64px vertical, 32px horizontal
- Desktop: 96px vertical, 48px horizontal

### Border Radius System

```css
--radius-sm: 0.25rem;  /* 4px - small elements */
--radius-md: 0.5rem;   /* 8px - cards, buttons */
--radius-lg: 1rem;     /* 16px - large cards */
--radius-xl: 1.5rem;   /* 24px - hero sections */
--radius-full: 9999px; /* Fully rounded */
```

### Shadow System

```css
/* Elevation levels */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Glow effects */
--glow-yellow: 0 0 20px rgba(255, 215, 0, 0.5);
--glow-blue: 0 0 20px rgba(0, 212, 230, 0.5);
--glow-purple: 0 0 20px rgba(160, 32, 240, 0.5);
```

### Animation Timing

```css
/* Duration */
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

/* Easing functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-fixed: 1200;
--z-modal-backdrop: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-tooltip: 1600;
```

## Implementation Phases

### Phase 1: Visual Effects Foundation
- Implement ParticleBackground component
- Add ShaderGradient component
- Create GlassmorphicCard component
- Set up performance monitoring

### Phase 2: Tech Stack Showcase
- Build TechStackGrid component
- Integrate code editor
- Implement code execution sandbox
- Add performance metrics display

### Phase 3: Enhanced Sections
- Upgrade Hero section with new effects
- Build CaseStudyCard with animations
- Create AnimatedCounter component
- Add DataVisualization component

### Phase 4: AI Features
- Build ProjectEstimator component
- Implement user behavior tracking
- Create ContextualSuggestions component
- Add personalization logic

### Phase 5: Micro-interactions
- Implement ScrollAnimationWrapper
- Add MicroInteraction component
- Enhance all interactive elements
- Polish transitions

### Phase 6: Optimization & Testing
- Performance optimization
- Cross-browser testing
- Accessibility audit
- Mobile optimization
- Load testing
