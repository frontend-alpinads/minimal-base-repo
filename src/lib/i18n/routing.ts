import { defaultLocale, type Locale } from "./config";
import { variantKeys, type VariantKey } from "@/contents/variants-keys";

// Type for alias map (alias string -> VariantKey)
type AliasMap = Map<string, VariantKey>;

// Import variantKeys at module level for type inference
const allVariantKeys = variantKeys;

// SiteVersion is now dynamic based on available variant keys
// v1 is always the default (unversioned routes alias to v1)
export const siteVersions = variantKeys.filter(
  (k) => k !== variantKeys[0],
) as readonly string[];
export type SiteVersion = "v1" | (typeof siteVersions)[number];

export interface ParsedPathname {
  version: SiteVersion;
  locale: Locale;
  slugSegments: string[];
  slugPath: string; // always starts with "/" ("/" means home)
  isAliasPath: boolean; // true if path was resolved from an alias
  resolvedFromAlias?: string; // the alias used to resolve this path
}

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function parsePathname(
  pathname: string,
  aliasMap?: AliasMap,
): ParsedPathname {
  const normalized = normalizePathname(pathname);
  const segments = normalized.split("/").filter(Boolean);

  let version: SiteVersion = "v1";
  let idx = 0;
  let isAliasPath = false;
  let resolvedFromAlias: string | undefined;

  const maybeVersion = segments[0];

  // First, check if the first segment is a path alias
  if (aliasMap && maybeVersion && aliasMap.has(maybeVersion)) {
    const variantKey = aliasMap.get(maybeVersion)!;
    // "default" variant maps to "v1" in URL terms
    version = variantKey === "default" ? "v1" : (variantKey as SiteVersion);
    isAliasPath = true;
    resolvedFromAlias = maybeVersion;
    idx = 1;
  }
  // Then check if it's a valid variant key (including v1, but v1 is handled as unversioned)
  else if (
    maybeVersion &&
    allVariantKeys.includes(maybeVersion as VariantKey)
  ) {
    version = maybeVersion as SiteVersion;
    idx = 1;
  }

  const slugSegments = segments.slice(idx);
  const slugPath = "/" + slugSegments.join("/");

  return {
    version,
    locale: defaultLocale, // Always German
    slugSegments,
    slugPath: slugPath === "/" ? "/" : slugPath,
    isAliasPath,
    resolvedFromAlias,
  };
}

export function parseSegments(
  segments?: string[],
  aliasMap?: AliasMap,
): ParsedPathname {
  return parsePathname("/" + (segments ?? []).join("/"), aliasMap);
}

export function formatPathname(args: {
  version: SiteVersion;
  slugPath: string; // "/" or "/some/path"
}): string {
  const { version, slugPath } = args;
  const slug = slugPath === "/" ? "" : slugPath;

  const versionPrefix = version === "v1" ? "" : `/${version}`;

  const path = `${versionPrefix}${slug}`;
  return path || "/";
}

/**
 * Format a pathname using a path alias instead of the version.
 * e.g., formatPathnameWithAlias({ alias: "spring-summer", slugPath: "/" })
 *       => "/spring-summer"
 */
export function formatPathnameWithAlias(args: {
  alias: string;
  slugPath: string;
}): string {
  const { alias, slugPath } = args;
  const slug = slugPath === "/" ? "" : slugPath;
  return `/${alias}${slug}`;
}
