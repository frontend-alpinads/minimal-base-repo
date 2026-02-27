"use client";

import { locales } from "@/lib/i18n";

type LanguageSwitcherProps = {
  ghost?: boolean;
};

// German-only site - no language switcher needed
export function LanguageSwitcher({ ghost: _ghost = false }: LanguageSwitcherProps) {
  // Only show if there are multiple languages
  if (locales.length <= 1) {
    return null;
  }

  // Fallback (should not reach here with single locale)
  return null;
}
