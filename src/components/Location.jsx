import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { site, whatsappUrl } from "../data/site";
import { Icon, nearbyIcon } from "./icons";

function IllustratedMap() {
  const roads = [
    "M-10 210 C 90 200, 150 150, 250 160 S 420 190, 520 150",
    "M180 -10 C 190 90, 200 200, 170 400",
    "M-10 90 H 520",
    "M360 -10 C 350 120, 380 260, 340 400",
    "M-10 320 C 120 300, 260 330, 520 300",
  ];
  const blocks = [
    [20, 20, 130, 50], [210, 20, 120, 50], [390, 20, 110, 50],
    [20, 110, 130, 70], [210, 110, 120, 30], [390, 110, 110, 30],
    [20, 240, 130, 60], [210, 190, 110, 100], [390, 205, 110, 80],
    [20, 340, 130, 40], [210, 335, 110, 40], [390, 330, 110, 50],
  ];
  const spots = [
    { x: 95, y: 215, Ico: Icon.Bus },
    { x: 265, y: 88, Ico: Icon.Food },
    { x: 430, y: 170, Ico: Icon.Shop },
  ];
  return (
    <svg viewBox="0 0 500 380" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Illustrated map of the area around the hall">
      <rect width="500" height="380" fill="var(--wall)" />
      {blocks.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="10" fill="var(--wall-deep)" />
      ))}
      <g fill="none" strokeLinecap="round">
        {roads.map((d, i) => (
          <path key={`b${i}`} d={d} stroke="var(--line)" strokeWidth="20" />
        ))}
        {roads.map((d, i) => (
          <path key={i} data-road d={d} pathLength="1" stroke="var(--surface)" strokeWidth="14" strokeDasharray="1" strokeDashoffset="0" />
        ))}
      </g>
      {spots.map(({ x, y, Ico }, i) => (
        <g key={i} data-spot transform={`translate(${x} ${y})`}>
          <circle r="17" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
          <g transform="translate(-10 -10)" style={{ color: "var(--leaf)" }}>
            <Ico width="20" height="20" />
          </g>
        </g>
      ))}
      <g transform="translate(250 205)">
        <circle data-pulse r="16" fill="var(--leaf)" opacity="0" />
        <ellipse cx="0" cy="2" rx="11" ry="4" fill="var(--ink)" opacity="0.25" />
        <g data-pin>
          <path d="M0 0C-6-10-20-20-20-34a20 20 0 0 1 40 0C20-20 6-10 0 0Z" fill="var(--leaf)" stroke="var(--surface)" strokeWidth="3" />
          <circle cy="-34" r="7" fill="var(--surface)" />
        </g>
      </g>
    </svg>
  );
}

export default function Location() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-loc-head] > *", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        });

        // Map card rises in. With the illustrated map, streets draw themselves and the pin drops.
        const map = gsap.timeline({ scrollTrigger: { trigger: "[data-map]", start: "top 75%" } });
        map.from("[data-map]", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" });

        if (rootRef.current.querySelector("[data-road]")) {
          map
            .fromTo("[data-road]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.12, ease: "power2.inOut" }, 0.2)
            .from("[data-spot]", { scale: 0, transformOrigin: "50% 50%", stagger: 0.12, duration: 0.5, ease: "back.out(3)" }, 0.9)
            .from("[data-pin]", { y: -140, duration: 0.7, ease: "bounce.out" }, 1.1);

          gsap.fromTo(
            "[data-pulse]",
            { attr: { r: 12 }, opacity: 0.5 },
            { attr: { r: 44 }, opacity: 0, duration: 1.8, ease: "power1.out", repeat: -1, delay: 2 }
          );
        }

        // Nearby: a route line fills as you scroll, each stop lights up when it's reached.
        gsap.fromTo(
          "[data-route-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-route]", start: "top 70%", end: "bottom 60%", scrub: true },
          }
        );
        gsap.utils.toArray("[data-stop]", rootRef.current).forEach((stop) => {
          gsap
            .timeline({ scrollTrigger: { trigger: stop, start: "top 72%" } })
            .from(stop.querySelector("[data-stop-icon]"), { scale: 0, rotate: -90, duration: 0.55, ease: "back.out(2.5)" })
            .from(stop.querySelector("[data-stop-text]"), { x: 24, opacity: 0, duration: 0.5, ease: "power3.out" }, "<0.1");
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="location" ref={rootRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div data-loc-head className="mb-12 max-w-2xl sm:mb-16">
          <h2 className="t-h2">Easy to reach, easy to stay.</h2>
          <p className="t-lead mt-5 text-muted">
            {site.shortAddress
              ? `Find us on ${site.shortAddress}${site.landmark ? `, ${site.landmark}` : ""}. Everything a long study day needs is close by.`
              : "The hall is in a convenient, easily accessible spot, with everything a long study day needs close by."}
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-14">
          <div data-map className="overflow-hidden rounded-[28px] border border-line bg-surface shadow-soft">
            <div className="relative h-[300px] sm:h-[380px]">
              {site.mapEmbedUrl ? (
                <iframe
                  title={`Map showing ${site.name}`}
                  src={site.mapEmbedUrl}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <IllustratedMap />
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
              <div className="min-w-0 max-w-md">
                <p className="text-lg font-bold">{site.name}</p>
                <p className="text-muted">{site.address || "Open 24 hours, 7 days a week"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {site.phone && (
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-line px-4 py-3 font-semibold hover:bg-wall"
                  >
                    <Icon.Phone className="h-5 w-5" /> Call
                  </a>
                )}
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-line px-4 py-3 font-semibold hover:bg-wall"
                  >
                    <Icon.Chat className="h-5 w-5" /> WhatsApp
                  </a>
                )}
                <a
                  href={site.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-leaf px-5 py-3 font-semibold text-on-leaf transition-transform hover:-translate-y-0.5"
                >
                  <Icon.Pin className="h-5 w-5" /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          <div data-route className="relative">
            <div aria-hidden="true" className="absolute bottom-8 left-[27px] top-8 w-[3px] rounded-full bg-line">
              <div data-route-fill className="h-full w-full origin-top rounded-full bg-leaf" />
            </div>
            <ul className="relative flex flex-col gap-9">
              {site.nearby.map((n) => {
                const Ico = nearbyIcon[n.icon] || Icon.Pin;
                return (
                  <li key={n.title} data-stop className="flex items-start gap-5">
                    <span data-stop-icon className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface text-leaf shadow-soft">
                      <Ico className="h-6 w-6" />
                    </span>
                    <div data-stop-text className="pt-1.5">
                      <h3 className="t-h3">{n.title}</h3>
                      <p className="mt-1.5 text-muted">{n.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
