// Validity period for offers with multiple date ranges
export type ValidityPeriod = {
  from: string; // DD.MM.YYYY format
  to: string; // DD.MM.YYYY format
  effectiveFrom?: string; // max(from, today) - calculated at runtime
};

// Data types - simplified without localization
export type Offer = {
  title: string;
  validityPeriods: ValidityPeriod[];
  nights: number;
  minNights?: number;
  price: number;
  description: string;
  features: string[];
  imageSrc: string;
  longDescription?: string;
  inclusions?: string[];
};

export type Room = {
  id: string;
  code?: string; // AlpineBits room code (e.g., "ZAPF", "DZM", "DASU")
  name: string;
  description: string;
  price: number;
  currency: string;
  capacity: string; // e.g., "For 1-2 person"
  area: string; // e.g., "44sqm" or "23 - 29 sqm"
  image: string;
  images?: string[]; // Additional images for carousel
  type: string;
  features: string[];
  longDescription: string;
  includedServices: string[];
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type Testimonial = {
  text: string;
  name: string;
  country: string;
  rating: number;
};
