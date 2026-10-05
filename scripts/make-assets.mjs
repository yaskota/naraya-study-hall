// One-off generator for the small logo, favicon set and social-share image.
// Source: assets-src/logo.png. Run with:  npm run assets
// Output goes to public/ and is committed, so the build never needs sharp.

import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile } from "node:fs/promises";

const SRC = "assets-src/logo.png";
const CREAM = "#fefbf6";
const NAVY = "#012b59";
const SAFFRON = "#fd7d04";

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

// Logo scaled to fit a square, optionally on the cream background with padding.
async function square(size, { padding = 0, background = transparent } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const logo = await sharp(SRC).resize(inner, inner, { fit: "contain", background: transparent }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: logo, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const out = (name, buf) => writeFile(`public/${name}`, buf);

// In-page logo (shown at 44px; 128px covers 3x phone screens).
await out("logo-128.png", await sharp(SRC).resize(128, 132, { fit: "contain", background: transparent }).png({ compressionLevel: 9 }).toBuffer());

// Browser tab and app icons.
const f16 = await square(16, { padding: 0.04 });
const f32 = await square(32, { padding: 0.04 });
const f48 = await square(48, { padding: 0.04 });
await out("favicon-32.png", f32);
await out("favicon.ico", await pngToIco([f16, f32, f48]));
await out("apple-touch-icon.png", await square(180, { padding: 0.12, background: CREAM }));
await out("logo-192.png", await square(192, { padding: 0.1, background: CREAM }));
await out("logo-512.png", await square(512, { padding: 0.1, background: CREAM }));

// Social share card, 1200x630.
const logoOg = await sharp(SRC).resize(430, 430, { fit: "contain", background: transparent }).toBuffer();
const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${CREAM}"/>
  <rect x="0" y="0" width="14" height="630" fill="${SAFFRON}"/>
  <text x="560" y="205" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="${SAFFRON}" letter-spacing="3">SANGAREDDY, TELANGANA</text>
  <text x="560" y="290" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="800" fill="${NAVY}">Narayana</text>
  <text x="560" y="368" font-family="Segoe UI, Arial, sans-serif" font-size="68" font-weight="800" fill="${NAVY}">Study Hall</text>
  <text x="560" y="435" font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="${NAVY}">24/7 AC study hall &amp; reading room</text>
  <text x="560" y="485" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#52708f">105 seats  |  Free Wi-Fi  |  Open 24 hours</text>
</svg>`;
await out(
  "og-image.png",
  await sharp(Buffer.from(svg))
    .composite([{ input: logoOg, left: 90, top: 100 }])
    .png({ compressionLevel: 9 })
    .toBuffer()
);

console.log("Assets written to public/");
