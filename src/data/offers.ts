import { Offer } from "../shared-types";

// Template offers - replace with actual hotel offers
export const offers: Offer[] = [
  {
    title: "Frühlingsspezial 5=4",
    validityPeriods: [{ from: "01.04.2026", to: "30.05.2026" }],
    nights: 5,
    minNights: 5,
    price: 400,
    description: "Gönnen Sie sich mehr Zeit für Erholung und Naturgenuss. Bei einem Aufenthalt von fünf Nächten zahlen Sie nur vier.",
    features: ["Wandern", "Wellness", "Frühstück"],
    imageSrc: "/placeholder.svg",
    inclusions: [
      "5 Übernachtungen zum Preis von 4",
      "Tägliches Frühstück",
      "Nutzung des Wellnessbereichs",
      "Kostenloser Parkplatz",
    ],
  },
  {
    title: "Sommerwoche 7=6",
    validityPeriods: [{ from: "01.06.2026", to: "31.08.2026" }],
    nights: 7,
    minNights: 7,
    price: 600,
    description: "Erleben Sie einen unvergesslichen Sommerurlaub in den Dolomiten. Sieben Nächte buchen, nur sechs bezahlen.",
    features: ["Bergerlebnis", "Wellness", "Halbpension"],
    imageSrc: "/placeholder.svg",
    inclusions: [
      "7 Übernachtungen zum Preis von 6",
      "Halbpension",
      "Nutzung des Wellnessbereichs",
      "Geführte Wanderung",
      "Kostenloser Parkplatz",
    ],
  },
  {
    title: "Herbstgenuss 4=3",
    validityPeriods: [{ from: "01.10.2026", to: "15.11.2026" }],
    nights: 4,
    minNights: 4,
    price: 300,
    description: "Erleben Sie die goldene Jahreszeit in den Bergen. Vier Nächte buchen, nur drei bezahlen.",
    features: ["Herbsturlaub", "Wellness", "Kulinarik"],
    imageSrc: "/placeholder.svg",
    inclusions: [
      "4 Übernachtungen zum Preis von 3",
      "Tägliches Frühstück",
      "Nutzung des Wellnessbereichs",
      "Kostenloser Parkplatz",
    ],
  },
];
