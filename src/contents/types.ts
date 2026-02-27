import type { VariantKey } from "./variants-keys";

export type SectionKey =
  | "hero"
  | "about"
  | "features"
  | "gallery"
  | "enquiry"
  | "testimonials"
  | "faqs"
  | "offers"
  | "rooms"
  | "footer";
export type SectionVariant = string;
// Array format: [{ "hero": "v3" }, { "about": "v2" }, ...]
export type SectionVariantsArray = Array<
  Record<SectionKey, SectionVariant | false>
>;
// Object format for backward compatibility: { "hero": "v3", "about": "v2", ... }
export type SectionVariants = Record<SectionKey, SectionVariant | false>;

export interface HeroBookingFormContent {
  arrivalDeparture: string;
  arrivalDepartureLabel: string;
  guests: string;
  guestsLabel: string;
  adultsFormat: {
    one: string;
    other: string; // expects "{count}"
  };
  childrenFormat: {
    one: string;
    other: string; // expects "{count}"
  };
  requestOffer: string;
}

export interface SocialProofContent {
  rating?: number;
  maxRating?: number;
  totalReviews?: number;
  reviewsText?: string;
  link?: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  socialProof?: SocialProofContent;
  bookingForm: HeroBookingFormContent;
  images: string[];
}

export interface AboutContent {
  badge: string;
  title: string; // may contain "\n"
  description: string;
  images: string[];
}

export interface FeatureItemContent {
  title: string;
  description: string;
  imageSrc: string;
  iconName: string;
}

export interface FeaturesContent {
  badge: string;
  title: string; // may contain "\n"
  description: string;
  items: FeatureItemContent[];
}

export type GalleryTabKey = "all" | "apartments-suites" | "wellness" | "cuisine" | "experiences";

export interface GalleryImageContent {
  src: string;
  alt: string;
  category: string; // Category value (e.g., "vacation-apartments", "trieste-surrounding", "palazzo-argento")
}

export interface GalleryContent {
  badge: string;
  title: string; // may contain "\n"
  description: string;
  viewAll: string;
  tabs: Record<string, string>;
  categories: Record<string, string>;
  popup: {
    title: string;
    closeSrLabel: string;
  };
  highlightImages: {
    desktop: string[];
    mobile: string[];
  };
  images: GalleryImageContent[];
}

export interface EnquiryContent {
  badge: string;
  title: string; // may contain "\n"
  description: string;
  backgroundImage: string;
  form: {
    roomType: {
      label: string;
      roomOnly: string;
      roomWithOffer: string;
    };
    dates: {
      label: string;
      alternative: string;
    };
    offer: {
      label: string;
      choose: string;
    };
    room: {
      label: string;
      chooseWithGuests: string;
    };
    salutation: {
      label: string;
      mr: string;
      mrs: string;
    };
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
    newsletter: string;
    privacyPolicy: string;
    responseTime: string;
    submit: string;
    submitting: string;
    openingNotice?: string;
  };
}

export interface TestimonialsContent {
  badge: string;
  title: string; // may contain "\n"
  description: string;
  image: string;
}

export interface FaqsContent {
  badge: string;
  title: string; // may contain "\n"
  description: string;
}

export interface OffersContent {
  badge: string;
  title: string; // may contain "\n"
  description: string;
}

export interface RoomsContent {
  badge: string;
  title: string; // may contain "\n"
  description: string;
  tabs: Record<string, string>;
  logoImage: string;
}

export interface SiteContents {
  hero: HeroContent;
  about: AboutContent;
  features: FeaturesContent;
  gallery: GalleryContent;
  enquiry: EnquiryContent;
  testimonials: TestimonialsContent;
  faqs: FaqsContent;
  offers: OffersContent;
  rooms: RoomsContent;
}

// Re-export VariantSpec from schema for convenience
export type { VariantSpec } from "./schema";

// ====== Route Config Types ======
// Route configuration for URL aliasing per variant

export interface RouteConfig {
  pathAlias?: string; // URL alias for this variant (e.g., "spring-summer")
}

// ====== Filter Types ======
// Filters for conditionally showing/hiding content per variant

export interface OfferFilters {
  titleContains?: string[];  // Show offers where title contains any of these (OR logic)
  titleExcludes?: string[];  // Hide offers where title contains any of these
  validAfter?: string;       // YYYY-MM-DD - only show offers valid after this date
  validBefore?: string;      // YYYY-MM-DD - only show offers valid before this date
}

export interface VariantFilters {
  offers?: OfferFilters;
}
