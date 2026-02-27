import { type Locale, defaultLocale } from "./config";
import { formatPathname, parsePathname } from "./routing";

/**
 * Get locale - always returns German for this simplified site
 */
export function getLocaleFromPathname(_pathname: string): Locale {
  return defaultLocale;
}

/**
 * Format pathname without locale prefix (simplified - no locale in paths)
 * @param pathname - The current pathname
 * @returns The formatted pathname
 */
export function removeLocaleFromPathname(pathname: string): string {
  const parsed = parsePathname(pathname);
  return formatPathname({
    version: parsed.version,
    slugPath: parsed.slugPath,
  });
}
