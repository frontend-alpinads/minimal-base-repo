export const locales = ['de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export const localeNames: Record<Locale, string> = {
  de: 'Deutsch',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
