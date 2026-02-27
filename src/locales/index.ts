import de from "./de";
import { Dictionary } from "./types";

/**
 * Returns the German dictionary.
 * No locale parameter needed - German only site.
 */
export function getDictionary(): Dictionary {
  return de;
}

export type { Dictionary };
