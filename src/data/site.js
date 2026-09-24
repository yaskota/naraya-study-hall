// Everything the page says lives here, so the client's details can be
// updated without touching any component.

export const site = {
  name: "Naraya Study Hall",
  since: "November 2023",
  totalSeats: 105,

  // Seats are drawn 15 per row. Set this to the real AC seat count
  // (a multiple of 15 keeps the floor plan tidy). The rest are non-AC.
  acSeats: 45,

  selections: 10, // shown as "10+"

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
  phone: "+91 79994 99199",
  whatsapp: "", // digits only with country code, e.g. "917999499199", if this number is on WhatsApp

  // Google rating shown in the hero and on the result slip. Update as reviews come in.
  google: { rating: "5.0", reviews: 42 },

  // Photos: drop image files into /public/photos using exactly these file names.
  // Until a file exists, its illustration is shown instead, so nothing breaks.
  photos: [
    { src: "/photos/reading-hall.jpg", scene: "hall", title: "The main reading hall", note: "rows of desks, light green walls" },
    { src: "/photos/ac-section.jpg", scene: "ac", title: "AC section", note: "cool and quiet all afternoon" },
    { src: "/photos/desk.jpg", scene: "desk", title: "Your desk", note: "room for books, notes and a laptop" },
    { src: "/photos/non-ac-section.jpg", scene: "fan", title: "Non-AC section", note: "the same calm, a different corner" },
    { src: "/photos/entrance.jpg", scene: "entrance", title: "Entrance and parking", note: "ground-floor parking, straight in" },
  ],

  nearby: [
    { icon: "bus", title: "Public transport", text: "Public transport nearby makes the daily commute simple." },
    { icon: "food", title: "Food and dining", text: "Places to eat close by for your meal breaks." },
    { icon: "shop", title: "Shops and daily needs", text: "Shops for daily necessities are nearby." },
    { icon: "walk", title: "Easy to reach", text: "Simple to get to for students from nearby areas." },
  ],
};
