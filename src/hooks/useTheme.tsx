import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   THEME SYSTEM - Global theme provider with instant switching
   Themes are defined in index.css via [data-theme="*"] selectors
═══════════════════════════════════════════════════════════════════════════ */

export type ThemeName = "default" | "crimson" | "emerald" | "violet" | "amber";

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: ThemeName[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "system-theme";

const themes: ThemeName[] = ["default", "crimson", "emerald", "violet", "amber"];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    // Check localStorage for saved theme
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && themes.includes(saved as ThemeName)) {
        return saved as ThemeName;
      }
    }
    return "default";
  });

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme attributes first
    root.removeAttribute("data-theme");
    
    // Apply new theme if not default
    if (theme !== "default") {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/* ═══════════════════════════════════════════════════════════════════════════
   THEME METADATA - Display info for theme selector UI
═══════════════════════════════════════════════════════════════════════════ */

export const themeMetadata: Record<ThemeName, { label: string; color: string }> = {
  default: { label: "Cyan", color: "hsl(195 100% 50%)" },
  crimson: { label: "Crimson", color: "hsl(0 85% 55%)" },
  emerald: { label: "Emerald", color: "hsl(142 76% 45%)" },
  violet: { label: "Violet", color: "hsl(270 70% 60%)" },
  amber: { label: "Amber", color: "hsl(35 100% 50%)" },
};
