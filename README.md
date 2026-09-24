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
| `photos` | Put images in `public/photos/` and set `src: "/photos/hall.jpg"`. Empty `src` shows the built-in illustration. |
| `acSeats` | Real number of AC seats (rest are non-AC). Currently a placeholder of 45. |
| `mapEmbedUrl` | Google Maps → Share → Embed a map → copy the `src` URL. Empty shows the illustrated map. |
| `phone`, `whatsapp`, `address` | Call / WhatsApp buttons and the address line appear only when filled in. |
| `directionsUrl` | Used by every "Get directions" button. |

## Sections and their motion

| Section | File | Animation |
| --- | --- | --- |
| Navbar | `Navbar.jsx` | Slides away on scroll down, returns on scroll up; clip-path mobile menu; day/night theme toggle |
| Hero + floor plan | `Hero.jsx`, `SeatMap.jsx` | Masked line reveal (SplitText), 105 seats pop in from the centre (grid stagger), tape + hand-drawn arrow, pointer tilt, AC / non-AC filter, seat tooltips |
| Facilities | `Facilities.jsx` | Shutter clip-path reveal (ScrollTrigger.batch); each card has its own animation: Wi-Fi pulse, spinning fan & snowflake, water fill with moving wave, self-drawing icon, scooter parking, noise-to-calm bars; pointer glow + tilt |
| Photos | `Gallery.jsx`, `HallScene.jsx` | Desktop: pinned horizontal scroll with per-frame wipe, tilt and inner parallax + progress bar. Mobile: masked rise + parallax. Lightbox with keyboard support |
| Open 24/7 | `RoundTheClock.jsx` | Pinned, scroll-scrubbed 24-hour dial; sky shifts day → night, captions swap, stars twinkle, snaps to each time |
| Results | `Results.jsx` | Result slip slides in, numbers count up, "Selected 10+" stamp slams down |
| Location | `Location.jsx` | Streets draw themselves, pin drops with bounce + pulse, route line fills as you scroll |
| Footer CTA | `Footer.jsx` | Character-by-character headline, seats light up like desk lamps at night |

All motion is wrapped in `gsap.matchMedia()` and switches off for visitors who prefer reduced motion.
