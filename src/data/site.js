// Everything the page says lives here, so the client's details can be
// updated without touching any component.

export const site = {
  name: "Narayana Study Hall",
  since: "November 2023",
  totalSeats: 105,

  // Seats are drawn 15 per row. Set this to the real AC seat count
  // (a multiple of 15 keeps the floor plan tidy). The rest are non-AC.
  acSeats: 75,

  selections: 10, // shown as "10+"

  // ---- SEO ----------------------------------------------------------------
  // The live address of the site. Used for canonical, sitemap, social cards and structured data.
  url: "https://narayanastudyhall.com",
  // Coordinates of the hall (from the Google Maps listing).
  geo: { lat: 17.5913603, lng: 78.0768397 },
  // Competitive exams students here prepare for (used in the FAQ and structured data).
  exams: ["TGPSC Group exams", "Police SI and Constable", "SSC", "RRB", "Banking"],
  // Places students come from (shown in the footer and used as areaServed).
  areasServed: ["Sangareddy", "Pothreddipalle", "APHB Colony", "Kandi", "Patancheru"],
  // Profile URLs (Instagram, Facebook, Justdial, ...). Add them here once they exist.
  sameAs: [],

  // Google Maps link for the hall (used by every "Get directions" button).
  directionsUrl: "https://maps.app.goo.gl/nAkwznu7WkpQzKkZ9",

  // Live map shown in the Location section. Leave empty to show the illustrated map instead.
  mapEmbedUrl:
    "https://www.google.com/maps?q=Narayana+studyhalls,+Mig+7,+5-43,+Sangareddy+Bypass+Rd,+Pothreddipalle,+Sangareddy,+Telangana+502001&output=embed",

  // Contact details. Buttons and lines only appear when filled in.
  address:
    "Mig 7, 5-43, Sangareddy Bypass Rd, beside Bashweshwara statue, APHB Colony, Pothreddipalle, Sangareddy, Telangana 502001",
  shortAddress: "Sangareddy Bypass Rd, Pothreddipalle, Sangareddy",
  landmark: "beside the Bashweshwara statue",
  phone: "+91 99481 31602",
  phone2: "+91 93471 57236",
  whatsapp: "919948131602", // digits only, with country code
  whatsappMessage: "Hi, I'd like to know about seat availability at Narayana Study Hall.",

  // Google rating shown in the hero and on the result slip. Update as reviews come in.
  google: { rating: "5.0", reviews: 42 },

  // Photos: drop image files into /public/photos using exactly these file names.
  // Until a file exists, its illustration is shown instead, so nothing breaks.
  photos: [
    { src: "/photos/reading-hall.jpg", scene: "hall", title: "The main reading hall", alt: "Main reading hall with rows of study desks at Narayana Study Hall, Sangareddy", note: "rows of desks, light green walls" },
    { src: "/photos/ac-section.jpg", scene: "ac", title: "AC section", alt: "Air-conditioned study section at Narayana Study Hall, Sangareddy", note: "cool and quiet all afternoon" },
    { src: "/photos/desk.jpg", scene: "desk", title: "Your desk", alt: "Individual study desk at Narayana Study Hall, Sangareddy", note: "room for books, notes and a laptop" },
    { src: "/photos/non-ac-section.jpg", scene: "fan", title: "Non-AC section", alt: "Non-AC study section with fans at Narayana Study Hall, Sangareddy", note: "the same calm, a different corner" },
    { src: "/photos/entrance.jpg", scene: "entrance", title: "Entrance and parking", alt: "Entrance and ground-floor parking of Narayana Study Hall on Sangareddy Bypass Road", note: "ground-floor parking, straight in" },
  ],

  nearby: [
    { icon: "bus", title: "Public transport", text: "Public transport nearby makes the daily commute simple." },
    { icon: "food", title: "Food and dining", text: "Places to eat close by for your meal breaks." },
    { icon: "shop", title: "Shops and daily needs", text: "Shops for daily necessities are nearby." },
    { icon: "walk", title: "Easy to reach", text: "Simple to get to for students from nearby areas." },
  ],
};

// Ready-made WhatsApp chat link with the greeting pre-filled.
export const whatsappUrl = site.whatsapp
  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage || "")}`
  : "";
