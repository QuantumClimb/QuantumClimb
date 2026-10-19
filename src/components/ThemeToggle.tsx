import { Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "../lib/theme";

type ThemeToggleProps = Readonly<{
  /** "full": labels on large screens; "compact": icons only; "menu": always labelled. */
  variant?: "full" | "compact" | "menu";
  className?: string;
}>;

const OPTIONS: ReadonlyArray<{ value: Theme; label: string; ariaLabel: string }> = [
  { value: "light", label: "Light", ariaLabel: "Switch to light mode" },
  { value: "dark", label: "Dark", ariaLabel: "Switch to dark mode" },
];

export function ThemeToggle({ variant = "full", className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={`qc-theme-toggle ${className}`.trim()}
      data-variant={variant}
    >
      {OPTIONS.map(({ value, label, ariaLabel }) => {
        const Icon = value === "light" ? Sun : Moon;
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            className="qc-theme-toggle__btn"
            data-active={isActive}
            aria-label={ariaLabel}
            aria-pressed={isActive}
            title={ariaLabel}
            onClick={() => setTheme(value)}
          >
            <Icon className="qc-theme-toggle__icon" aria-hidden="true" />
            <span className="qc-theme-toggle__label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
