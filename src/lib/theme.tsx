import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

const THEME_COLOR: Record<Theme, string> = {
  dark: "#0a0a0a",
  light: "#ffffff",
};

function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME;

  // The inline script in index.html has normally already resolved the theme.
  const applied = document.documentElement.getAttribute("data-theme");
  if (isTheme(applied)) return applied;

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    /* localStorage unavailable (private mode etc.) */
  }
  return DEFAULT_THEME;
}

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;

  if (animate) {
    // Short, scoped colour transition that is removed again right after the swap.
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 260);
  }

  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  root.style.backgroundColor = THEME_COLOR[theme];
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[theme]);
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  // Keep the DOM in sync (no animation on first mount to avoid a flash).
  useEffect(() => {
    applyTheme(theme, false);
  }, [theme]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY && isTheme(event.newValue)) {
        applyTheme(event.newValue, true);
        setThemeState(event.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState((current) => {
      if (current !== next) applyTheme(next, true);
      return next;
    });
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* ignore persistence failures */
    }
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme],
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
