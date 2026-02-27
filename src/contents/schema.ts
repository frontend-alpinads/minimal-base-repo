import { z } from "zod";

const SectionVariantSchema = z.string();
const SectionKeySchema = z.enum([
  "hero",
  "about",
  "features",
  "gallery",
  "enquiry",
  "testimonials",
  "faqs",
  "offers",
  "rooms",
  "footer",
]);

// Schema for a single section variant entry: { "hero": "v3" } or { "hero": false }
const SectionVariantEntrySchema = z
  .record(z.string(), z.union([SectionVariantSchema, z.literal(false)]))
  .refine(
    (obj) => Object.keys(obj).length === 1,
    "Each section variant entry must have exactly one key",
  )
  .refine((obj) => {
    const key = Object.keys(obj)[0];
    return SectionKeySchema.safeParse(key).success;
  }, "Section key must be a valid section key");

// ====== Section Schemas (simplified - no localization) ======

const HeroBookingFormSchema = z.object({
  arrivalDeparture: z.string(),
  arrivalDepartureLabel: z.string(),
  guests: z.string(),
  guestsLabel: z.string(),
  adultsFormat: z.object({
    one: z.string(),
    other: z.string(),
  }),
  childrenFormat: z.object({
    one: z.string(),
    other: z.string(),
  }),
  requestOffer: z.string(),
});

const SocialProofSchema = z
  .object({
    rating: z.number().optional(),
    maxRating: z.number().optional(),
    totalReviews: z.number().optional(),
    reviewsText: z.string().optional(),
    link: z.string().optional(),
  })
  .optional();

const HeroSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  socialProof: SocialProofSchema,
  images: z.array(z.string()),
  bookingForm: HeroBookingFormSchema,
});

const AboutSchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  images: z.array(z.string()),
});

const FeatureItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageSrc: z.string(),
  iconName: z.string(),
});

const FeaturesSchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  items: z.array(FeatureItemSchema),
});

const GalleryImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  category: z.string(),
});

const GallerySchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  viewAll: z.string(),
  tabs: z.record(z.string(), z.string()),
  categories: z.record(z.string(), z.string()),
  popup: z.object({
    title: z.string(),
    closeSrLabel: z.string(),
  }),
  highlightImages: z.object({
    desktop: z.array(z.string()),
    mobile: z.array(z.string()),
  }),
  images: z.array(GalleryImageSchema),
});

const EnquiryFormSchema = z.object({
  roomType: z.object({
    label: z.string(),
    roomOnly: z.string(),
    roomWithOffer: z.string(),
  }),
  dates: z.object({
    label: z.string(),
    alternative: z.string(),
  }),
  offer: z.object({
    label: z.string(),
    choose: z.string(),
  }),
  room: z.object({
    label: z.string(),
    chooseWithGuests: z.string(),
  }),
  salutation: z.object({
    label: z.string(),
    mr: z.string(),
    mrs: z.string(),
  }),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string(),
  message: z.string(),
  newsletter: z.string(),
  privacyPolicy: z.string(),
  responseTime: z.string(),
  submit: z.string(),
  submitting: z.string(),
  openingNotice: z.string().optional(),
});

const EnquirySchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  backgroundImage: z.string(),
  form: EnquiryFormSchema,
});

const TestimonialsSchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
});

const FaqsSchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
});

const OffersSchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
});

const RoomsSchema = z.object({
  badge: z.string(),
  title: z.string(),
  description: z.string(),
  tabs: z.record(z.string(), z.string()),
  logoImage: z.string(),
});

// ====== Route Config Schema ======
// Schema for variant-specific URL aliasing

const RouteConfigSchema = z.object({
  pathAlias: z.string().optional(), // e.g., "spring-summer" - URL alias for this variant
});

// ====== Filter Schemas ======
// Schemas for variant-specific content filtering

const OfferFiltersSchema = z.object({
  titleContains: z.array(z.string()).optional(),
  titleExcludes: z.array(z.string()).optional(),
  validAfter: z.string().optional(),  // YYYY-MM-DD
  validBefore: z.string().optional(), // YYYY-MM-DD
});

const VariantFiltersSchema = z.object({
  offers: OfferFiltersSchema.optional(),
});

export const VariantSpecSchema = z.object({
  $schema: z.string().optional(),
  routeConfig: RouteConfigSchema.optional(),
  sectionVariants: z.array(SectionVariantEntrySchema),
  filters: VariantFiltersSchema.optional(),
  content: z.object({
    hero: HeroSchema,
    about: AboutSchema,
    features: FeaturesSchema,
    gallery: GallerySchema,
    enquiry: EnquirySchema,
    testimonials: TestimonialsSchema,
    faqs: FaqsSchema,
    offers: OffersSchema,
    rooms: RoomsSchema,
  }),
});

export type VariantSpec = z.infer<typeof VariantSpecSchema>;
