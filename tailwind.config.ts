import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* ═══════════════════════════════════════════════════════════════════
         TYPOGRAPHY TOKENS
      ═══════════════════════════════════════════════════════════════════ */
      fontFamily: {
        system: ["Orbitron", "monospace"],
        body: ["system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        system: "0.15em",
        "system-wide": "0.1em",
      },

      /* ═══════════════════════════════════════════════════════════════════
         COLOR TOKENS - All consume CSS variables from index.css
      ═══════════════════════════════════════════════════════════════════ */
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // System design tokens
        system: {
          glow: "hsl(var(--system-glow))",
          "glow-dim": "hsl(var(--system-glow-dim))",
          dark: "hsl(var(--system-dark))",
          card: "hsl(var(--system-card))",
          "card-hover": "hsl(var(--system-card-hover))",
          border: "hsl(var(--system-border))",
        },
        // Status colors
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          glow: "hsl(var(--success-glow))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          glow: "hsl(var(--warning-glow))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
          glow: "hsl(var(--danger-glow))",
        },
      },

      /* ═══════════════════════════════════════════════════════════════════
         BORDER RADIUS TOKENS
      ═══════════════════════════════════════════════════════════════════ */
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },

      /* ═══════════════════════════════════════════════════════════════════
         SHADOW TOKENS
      ═══════════════════════════════════════════════════════════════════ */
      boxShadow: {
        "glow-sm": "var(--shadow-glow-sm)",
        "glow-md": "var(--shadow-glow-md)",
        "glow-lg": "var(--shadow-glow-lg)",
        "glow-xl": "var(--shadow-glow-xl)",
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        elevated: "var(--shadow-elevated)",
        overlay: "var(--shadow-overlay)",
      },

      /* ═══════════════════════════════════════════════════════════════════
         SPACING TOKENS
      ═══════════════════════════════════════════════════════════════════ */
      spacing: {
        "card-padding": "var(--space-card-padding)",
        "card-padding-sm": "var(--space-card-padding-sm)",
        "section-gap": "var(--space-section-gap)",
        "element-gap": "var(--space-element-gap)",
      },

      /* ═══════════════════════════════════════════════════════════════════
         ANIMATION TOKENS
      ═══════════════════════════════════════════════════════════════════ */
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
