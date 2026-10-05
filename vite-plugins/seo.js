// Build-time SEO for a client-rendered page.
//
// Everything is generated from src/data/site.js and src/data/faq.js, so the name,
// address and phone numbers can never drift apart between the page, the structured
// data and the files search engines read:
//   - replaces __SITE_URL__ in index.html (canonical, social cards)
//   - injects LocalBusiness / WebSite / FAQPage JSON-LD into <head>
//   - puts real, crawlable content inside #root (React replaces it on load)
//   - emits sitemap.xml and robots.txt

import { site } from "../src/data/site.js";
import { faq } from "../src/data/faq.js";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const tel = (p) => p.replace(/[^\d+]/g, "");

function jsonLd() {
  const nonAc = site.totalSeats - site.acSeats;
  const amenity = (name) => ({ "@type": "LocationFeatureSpecification", name, value: true });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#business`,
        name: site.name,
        alternateName: ["Narayana Study Halls", "Narayana Study Hall Sangareddy"],
        description: `${site.name} is a 24-hour study hall and reading room in Sangareddy with ${site.totalSeats} seats (${site.acSeats} AC, ${nonAc} non-AC), free Wi-Fi and parking, for competitive exam preparation.`,
        url: site.url,
        image: [`${site.url}/og-image.png`],
        logo: `${site.url}/logo-512.png`,
        telephone: [tel(site.phone), tel(site.phone2)].filter(Boolean),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Mig 7, 5-43, Sangareddy Bypass Rd, beside Bashweshwara statue, APHB Colony",
          addressLocality: "Sangareddy",
          addressRegion: "Telangana",
          postalCode: "502001",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
        hasMap: site.directionsUrl,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
        amenityFeature: [
          amenity("Air conditioned study section"),
          amenity("Non-AC study section"),
          amenity("Free Wi-Fi"),
          amenity("Open 24 hours"),
          amenity("Drinking water"),
          amenity("Parking"),
          amenity("Washrooms"),
        ],
        foundingDate: "2023-11",
        ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ["en-IN", "te-IN"],
        publisher: { "@id": `${site.url}/#business` },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}

// Plain semantic content for crawlers and no-JS visitors. Styled inline so it
// looks tidy for the instant before the app mounts.
function fallbackHtml() {
  const nonAc = site.totalSeats - site.acSeats;
  return `
<div style="max-width:42rem;margin:0 auto;padding:6rem 1.25rem 3rem;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#012b59">
  <p style="margin:0 0 .5rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em">${esc(site.name)}</p>
  <h1 style="margin:0 0 1rem;font-size:2rem;line-height:1.15">24/7 study hall and reading room in Sangareddy: a quiet seat for every hour of your preparation</h1>
  <p>${esc(site.name)} is a ${site.totalSeats}-seat study hall in Sangareddy with ${site.acSeats} AC seats, ${nonAc} non-AC seats, free Wi-Fi, drinking water, parking and washrooms. Open 24 hours a day, 7 days a week, since ${esc(site.since)}.</p>
  <h2>Address and contact</h2>
  <address style="font-style:normal">
    ${esc(site.address)}<br>
    Phone: <a href="tel:${tel(site.phone)}">${esc(site.phone)}</a>, <a href="tel:${tel(site.phone2)}">${esc(site.phone2)}</a><br>
    <a href="${esc(site.directionsUrl)}">Open in Google Maps</a>
  </address>
  <h2>Facilities</h2>
  <ul>
    <li>${site.totalSeats} seats: ${site.acSeats} AC and ${nonAc} non-AC</li>
    <li>Free Wi-Fi, day and night</li>
    <li>Open 24 hours, 7 days a week</li>
    <li>Drinking water, washrooms and ground-floor parking</li>
  </ul>
  <h2>Frequently asked questions</h2>
  ${faq.map(({ q, a }) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("\n  ")}
</div>`;
}

export default function seo() {
  const today = new Date().toISOString().slice(0, 10);

  return {
    name: "narayana-seo",

    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const ld = `<script type="application/ld+json">${JSON.stringify(jsonLd())}</script>`;
        return html
          .replaceAll("__SITE_URL__", site.url)
          .replace("</head>", `    ${ld}\n  </head>`)
          .replace('<div id="root"></div>', `<div id="root">${fallbackHtml()}</div>`);
      },
    },

    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site.url}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
      });
    },
  };
}
