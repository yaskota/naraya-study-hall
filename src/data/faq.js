// Questions people actually ask before joining a study hall. Shown in the FAQ
// section and published as FAQPage structured data (see vite-plugins/seo.js).
// Plain-text answers only: the same strings are used in both places.

import { site } from "./site.js";

const acSeats = site.acSeats;
const nonAcSeats = site.totalSeats - site.acSeats;

export const faq = [
  {
    q: "Is Narayana Study Hall open 24 hours?",
    a: `Yes. ${site.name} in Sangareddy is open 24 hours a day, 7 days a week, so you can study early in the morning, late at night, or through the night before an exam.`,
  },
  {
    q: "Where is the study hall located in Sangareddy?",
    a: `We are at ${site.address}. Look for us on ${site.shortAddress}, ${site.landmark}.`,
  },
  {
    q: "How many seats are there, and how many are AC?",
    a: `There are ${site.totalSeats} seats in total: ${acSeats} in the AC section and ${nonAcSeats} in the non-AC section, so you can pick whichever you are more comfortable in.`,
  },
  {
    q: "Is Wi-Fi free at the study hall?",
    a: "Yes. Free Wi-Fi is available around the clock for online classes, study material and mock tests.",
  },
  {
    q: "Which exams do students prepare for here?",
    a: `Students prepare for competitive exams such as ${site.exams.join(", ")}. Since ${site.since}, ${site.selections}+ students who studied here have secured government jobs.`,
  },
  {
    q: "Is there parking, drinking water and a washroom?",
    a: "Yes. There is ground-floor parking, drinking water whenever you need it, and washrooms close to the hall.",
  },
  {
    q: "How do I book a seat or check availability?",
    a: `Call ${site.phone} or ${site.phone2}, or message us on WhatsApp at ${site.phone}. We will tell you which seats are free and the current fees.`,
  },
  {
    q: "స్టడీ హాల్ సంగారెడ్డిలో ఎక్కడ ఉంది?",
    a: `నారాయణ స్టడీ హాల్ సంగారెడ్డి బైపాస్ రోడ్, పోతిరెడ్డిపల్లి, బసవేశ్వర విగ్రహం పక్కన ఉంది. రోజుకు 24 గంటలు, వారంలో 7 రోజులు తెరిచి ఉంటుంది. AC మరియు నాన్-AC సీట్లు, ఉచిత Wi-Fi అందుబాటులో ఉన్నాయి. సంప్రదించండి: ${site.phone}.`,
  },
];
