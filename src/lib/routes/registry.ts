import type { Locale } from "@/lib/i18n";
import type { SiteVersion } from "@/lib/i18n/routing";

// German-only slugs
export const THANK_YOU_SLUG = "/danke";
export const PRIVACY_SLUG = "/datenschutzeinstellungen";

export type PageKey = "home" | "thank-you" | "privacy";

export type RouteDecision =
  | { type: "render"; page: PageKey; version: SiteVersion; locale: Locale }
  | { type: "redirect"; to: string };

export function decideRoute(input: {
  version: SiteVersion;
  locale: Locale;
  slugPath: string;
}): RouteDecision | null {
  const { version, locale, slugPath } = input;

  // Global routes (thank-you, privacy) are unversioned-only
  // If a version prefix is used, return null (will trigger 404)
  const isGlobalRoute =
    slugPath === THANK_YOU_SLUG || slugPath === PRIVACY_SLUG;

  if (isGlobalRoute) {
    if (version !== "v1") {
      // Version prefix used with global route → 404
      return null;
    }
    if (slugPath === THANK_YOU_SLUG) {
      return { type: "render", page: "thank-you", version: "v1", locale };
    }
    if (slugPath === PRIVACY_SLUG) {
      return { type: "render", page: "privacy", version: "v1", locale };
    }
  }

  if (slugPath === "/") return { type: "render", page: "home", version, locale };

  return null;
}
