"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  applyTheme,
  isTheme,
  readSavedTheme,
  type Theme,
} from "@/lib/theme";

// The theme lives on <html>, so that is what the button watches. Another tab
// changing it arrives as a `storage` event and is applied here too.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY && isTheme(event.newValue)) {
      applyTheme(event.newValue);
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

function getTheme(): Theme {
  const current = document.documentElement.getAttribute("data-theme");
  return isTheme(current) ? current : DEFAULT_THEME;
}

function getServerTheme(): Theme {
  return DEFAULT_THEME;
}

/**
 * Re-applies the saved theme once the app mounts. The inline script in
 * app/layout.tsx already did it before the first paint; this covers React's
 * development remount, which clears attributes it doesn't manage from <html>,
 * and sets the browser bar colour, whose meta tag can come after the script.
 * Rendered once, in the root layout.
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    applyTheme(readSavedTheme() ?? DEFAULT_THEME);
  }, []);
  return null;
}

/**
 * The sun/moon button that switches between the light and dark site. The
 * icon shows the theme you would switch to.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    // Stop every colour transition for the swap, so the page changes in one
    // frame instead of each hover-animated element fading on its own.
    const style = document.createElement("style");
    style.textContent = "*,*::before,*::after{transition:none!important}";
    document.head.appendChild(style);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked: the switch still works for this page view.
    }
    // Force a style pass before the transitions come back.
    void window.getComputedStyle(document.body).color;
    requestAnimationFrame(() => style.remove());
  };

  const Icon = next === "light" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggle}
      className={clsx(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:text-amber-400",
        className
      )}
      aria-label={next === "light" ? "Switch to light mode" : "Switch to dark mode"}
      title={next === "light" ? "Light mode" : "Dark mode"}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
