"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const isDark = mounted && resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      aria-label={`Switch to ${nextTheme} theme`}
      className="themeToggle"
      onClick={() => setTheme(nextTheme)}
      type="button"
    >
      {isDark ? (
        <Sun aria-hidden="true" size={17} strokeWidth={1.8} />
      ) : (
        <Moon aria-hidden="true" size={17} strokeWidth={1.8} />
      )}
    </button>
  );
}
