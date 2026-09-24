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

  // Google Maps share link for the hall (used by every "Get directions" button).
  directionsUrl: "https://share.google/xuUTBvvJ1Y7IpSKle",

  // Optional: Google Maps > Share > Embed a map > copy the src="..." URL here
  // to show a live map. Leave empty to show the illustrated map card.
  mapEmbedUrl: "",

  // Optional contact details. Buttons and lines only appear when filled in.
  address: "",
  phone: "", // e.g. "+91 98765 43210"
  whatsapp: "", // digits only with country code, e.g. "919876543210"

  // Photos: put image files in /public/photos and set src, e.g. "/photos/hall.jpg".
  // Any photo with an empty src shows an illustration in its place.
  photos: [
    { src: "", scene: "hall", title: "The main reading hall", note: "rows of desks, light green walls" },
    { src: "", scene: "ac", title: "AC section", note: "cool and quiet all afternoon" },
    { src: "", scene: "desk", title: "Your desk", note: "room for books, notes and a laptop" },
    { src: "", scene: "fan", title: "Non-AC section", note: "the same calm, a different corner" },
    { src: "", scene: "entrance", title: "Entrance and parking", note: "ground-floor parking, straight in" },
  ],

  nearby: [
    { icon: "bus", title: "Public transport", text: "Public transport nearby makes the daily commute simple." },
    { icon: "food", title: "Food and dining", text: "Places to eat close by for your meal breaks." },
    { icon: "shop", title: "Shops and daily needs", text: "Shops for daily necessities are nearby." },
    { icon: "walk", title: "Easy to reach", text: "Simple to get to for students from nearby areas." },
  ],
};
