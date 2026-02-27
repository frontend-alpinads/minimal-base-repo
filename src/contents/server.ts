import type { SiteVersion } from "@/lib/i18n/routing";
import type {
  SiteContents,
  SectionVariantsArray,
  VariantFilters,
} from "./types";
import { VariantSpecSchema, type VariantSpec } from "./schema";
import {
  loadVariantJson,
  variantKeys,
  type VariantKey,
} from "./variants-manifest";

// Map SiteVersion to VariantKey (they should align, but we validate)
function siteVersionToVariantKey(version: SiteVersion): VariantKey {
  if (variantKeys.includes(version as VariantKey)) {
    return version as VariantKey;
  }
  // Fallback to v1 if version not found
  return variantKeys[0];
}

export async function getContents(version: SiteVersion): Promise<{
  contents: SiteContents;
  sectionVariants: SectionVariantsArray;
  filters?: VariantFilters;
}> {
  const variantKey = siteVersionToVariantKey(version);
  const loader = loadVariantJson[variantKey];
  const loaderModule = await loader();
  const rawData = loaderModule.default;

  // Validate with Zod
  const parsed = VariantSpecSchema.parse(rawData);

  // Content is already in final form (no locale extraction needed)
  return {
    contents: parsed.content,
    sectionVariants: parsed.sectionVariants,
    filters: parsed.filters,
  };
}
