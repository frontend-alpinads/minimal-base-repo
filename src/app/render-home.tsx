import { HomePage } from "@/components/pages/home-page";
import { rooms, offers, faqs, testimonials } from "@/data";
import type { SiteVersion } from "@/lib/i18n/routing";
import { getDictionary } from "@/locales";
import { getContents } from "@/contents/server";
import { filterOffersByVariant } from "@/utils/offer-utils";

export async function renderHome(version: SiteVersion) {
  const dictionary = getDictionary();
  const { contents, sectionVariants, filters } = await getContents(version);
  // Apply variant-specific offer filters
  const filteredOffers = filterOffersByVariant(offers, filters?.offers);

  return (
    <HomePage
      version={version}
      dictionary={dictionary}
      contents={contents}
      sectionVariants={sectionVariants}
      rooms={rooms}
      offers={filteredOffers}
      faqs={faqs}
      testimonials={testimonials}
    />
  );
}
