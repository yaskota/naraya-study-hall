# Naraya Study Hall – landing page

React 19 + Vite + Tailwind CSS v4 + GSAP (ScrollTrigger, SplitText via `@gsap/react`).

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
```

## Update the content

All text and settings live in **`src/data/site.js`**:

| Field | What it does |
| --- | --- |
| `photos` | Drop images into `public/photos/` as `reading-hall.jpg`, `ac-section.jpg`, `desk.jpg`, `non-ac-section.jpg`, `entrance.jpg`. A missing file shows its illustration instead. |
| `acSeats` | Number of AC seats (rest are non-AC). Currently 75 of 105. |
| `mapEmbedUrl` | Live Google map in the Location section. Empty shows the illustrated map. |
| `phone`, `whatsapp`, `address` | Call / WhatsApp buttons and the address line appear only when filled in. |
| `google` | Rating and review count shown in the hero and on the result slip. |
| `directionsUrl` | Used by every "Get directions" button. |

## Sections and their motion

| Section | File | Animation |
| --- | --- | --- |
| Navbar | `Navbar.jsx` | Slides away on scroll down, returns on scroll up; clip-path mobile menu; day/night toggle (always opens in light) |
| Hero + floor plan | `Hero.jsx`, `SeatMap.jsx` | Masked line reveal (SplitText), 105 seats pop in from the centre (grid stagger), tape + hand-drawn arrow, pointer tilt, AC / non-AC filter, seat tooltips |
| Facilities | `Facilities.jsx` | Shutter clip-path reveal (ScrollTrigger.batch); each card has its own animation: Wi-Fi pulse, spinning fan & snowflake, water fill with moving wave, self-drawing icon, scooter parking, noise-to-calm bars; pointer glow + tilt |
| Photos | `Gallery.jsx`, `HallScene.jsx` | Desktop: pinned horizontal scroll with per-frame wipe, tilt and inner parallax + progress bar. Mobile: masked rise + parallax. Lightbox with keyboard support |
| Open 24/7 | `RoundTheClock.jsx` | Pinned, scroll-scrubbed 24-hour dial; sky shifts day → night, captions swap, stars twinkle, snaps to each time |
| Results | `Results.jsx` | Result slip slides in, numbers count up, "Selected 10+" stamp slams down |
| Location | `Location.jsx` | Streets draw themselves, pin drops with bounce + pulse, route line fills as you scroll |
| Footer CTA | `Footer.jsx` | Character-by-character headline, seats light up like desk lamps at night |

All motion is wrapped in `gsap.matchMedia()` and switches off for visitors who prefer reduced motion.

## SEO

Search-engine setup is generated at build time by `vite-plugins/seo.js` from `src/data/site.js` and
`src/data/faq.js`, so the name, address and phone numbers stay identical everywhere:

- canonical / social-card URLs (`__SITE_URL__` in `index.html`) from `site.url`
- LocalBusiness + WebSite + FAQPage JSON-LD in `<head>`
- crawlable HTML inside `#root` (React replaces it on load)
- `sitemap.xml` and `robots.txt` in `dist/`

To change something, edit the data files, not the generated output:

| What | Where |
| --- | --- |
| Domain | `site.url` in `src/data/site.js` (also `public/llms.txt`) |
| Address, phones, hours, seats, exams, areas served | `src/data/site.js` |
| Social / Justdial profile links | `site.sameAs` (they appear in the structured data) |
| FAQ questions and answers | `src/data/faq.js` (shown on the page and in structured data) |
| Title, description, social text | `index.html` |
| Logo, favicons, share image | edit `assets-src/logo.png` or `scripts/make-assets.mjs`, then `npm run assets` |

The Google rating in `site.google` is shown on the page only. It is not put in structured data, because Google
ignores self-published ratings for local businesses.

### Off-site checklist (this is what moves "near me" results)

1. **Google Business Profile**: website = the site URL; hours = Open 24 hours; closest category plus secondary
   categories; Wi-Fi / AC / parking attributes; 15+ real photos; keyword-rich description; weekly posts; answer Q&A.
2. **Reviews**: keep asking every new student, using the short Google review link. Reply to every review.
3. **Search Console**: add the domain (DNS verification), submit `/sitemap.xml`, request indexing of the home page.
   Do the same in Bing Webmaster Tools and Bing Places.
4. **Citations** with identical name, address and phone: Justdial, Sulekha, Apple Business Connect, Facebook, Instagram.
5. **Real hall photos** in `public/photos/` (see the README there). Use WebP under 200 KB each.
6. **Domain**: redirect `www` to the bare domain (or the reverse) in Vercel and keep HTTPS on.
