import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "var(--section-padding-x)",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-primary)", "Inter", "system-ui", "sans-serif"],
        code: ["var(--font-code)", "JetBrains Mono", "Fira Code", "monospace"],
        display: ["var(--font-primary)", "Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gorilla: {
          black: "var(--gorilla-black)",
          yellow: "var(--gorilla-yellow)",
          white: "var(--gorilla-white)",
        },
        "text-on-dark": "var(--text-on-dark)",
        "text-on-yellow": "var(--text-on-yellow)",
        "text-muted-dark": "var(--text-muted-dark)",
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-card": "var(--bg-card)",
        "bg-overlay": "var(--bg-overlay)",
        neon: {
          blue: "var(--neon-blue)",
          purple: "var(--neon-purple)",
          pink: "var(--neon-pink)",
        },
        glass: {
          bg: "var(--glass-bg)",
          border: "var(--glass-border)",
        },
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        "5xl": "var(--text-5xl)",
      },
      lineHeight: {
        tight: "var(--leading-tight)",
        normal: "var(--leading-normal)",
        relaxed: "var(--leading-relaxed)",
      },
      fontWeight: {
        normal: "var(--font-normal)",
        medium: "var(--font-medium)",
        semibold: "var(--font-semibold)",
        bold: "var(--font-bold)",
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-md)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        "glow-yellow": "var(--glow-yellow)",
        "glow-blue": "var(--glow-blue)",
        "glow-purple": "var(--glow-purple)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        DEFAULT: "var(--duration-normal)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        "ease-in": "var(--ease-in)",
        "ease-out": "var(--ease-out)",
        "ease-in-out": "var(--ease-in-out)",
        bounce: "var(--ease-bounce)",
      },
      zIndex: {
        base: "var(--z-base)",
        dropdown: "var(--z-dropdown)",
        sticky: "var(--z-sticky)",
        fixed: "var(--z-fixed)",
        "modal-backdrop": "var(--z-modal-backdrop)",
        modal: "var(--z-modal)",
        popover: "var(--z-popover)",
        tooltip: "var(--z-tooltip)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-left": {
          from: { transform: "translateX(20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        scale: {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px var(--neon-blue)" },
          "50%": { boxShadow: "0 0 40px var(--neon-purple)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in var(--duration-normal) var(--ease-out)",
        "slide-up": "slide-up var(--duration-normal) var(--ease-out)",
        "slide-left": "slide-left var(--duration-normal) var(--ease-out)",
        scale: "scale var(--duration-normal) var(--ease-out)",
        glow: "glow 2s ease-in-out infinite",
      },
      backdropBlur: {
        glass: "var(--glass-blur)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
