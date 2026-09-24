import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import { site } from "../data/site";

const rows = [
  { label: "Seats", value: site.totalSeats, count: true },
  { label: "Open", value: "24 hours, 7 days" },
  { label: "Sections", value: "AC and non-AC" },
  { label: "Students selected", value: site.selections, suffix: "+", count: true },
];

export default function Results() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
        });

        tl.from("[data-res-copy] > *", { y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" })
          .from("[data-slip]", { x: 90, rotate: 9, opacity: 0, duration: 1, ease: "expo.out" }, 0.1)
          .from("[data-row]", { opacity: 0, x: -16, stagger: 0.12, duration: 0.45, ease: "power2.out" }, 0.55);

        // Numbers tick up like a tally.
        gsap.utils.toArray("[data-count]", rootRef.current).forEach((el) => {
          const end = Number(el.dataset.count);
          const obj = { v: 0 };
          tl.to(
            obj,
            {
              v: end,
              duration: 1.1,
              ease: "power2.out",
              onUpdate: () => (el.textContent = Math.round(obj.v)),
            },
            0.7
          );
        });

        // The stamp comes down hard, the slip jolts, the ink ring spreads.
        tl.fromTo(
          "[data-stamp]",
          { scale: 2.8, rotate: -22, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 0.9, duration: 0.32, ease: "power4.in" },
          "+=0.1"
        )
          .fromTo("[data-slip]", { y: 6 }, { y: 0, duration: 0.7, ease: "elastic.out(1, 0.28)" })
          .fromTo(
            "[data-ink-ring]",
            { scale: 0.9, opacity: 0.5 },
            { scale: 1.5, opacity: 0, duration: 0.7, ease: "power2.out", immediateRender: false },
            "<"
          );
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="results" ref={rootRef} className="relative overflow-hidden py-24 sm:py-32">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="ink-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" />
        </filter>
      </svg>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1fr_1.1fr]">
        <div data-res-copy>
          <h2 className="t-h2">From these desks to government jobs.</h2>
          <p className="t-lead mt-5 text-muted">
            Since {site.since}, {site.selections}+ students who prepared at {site.name} have cleared competitive
            government exams and secured government jobs.
          </p>
          <p className="t-note mt-7 -rotate-2 text-xl text-leaf">your name could be the next one on this list</p>
        </div>

        <div className="relative px-2 sm:px-6">
          <div data-slip className="ruled relative rotate-1 rounded-[18px] border border-line bg-surface p-6 pt-5 shadow-soft sm:p-8 sm:pt-6">
            <div className="flex flex-col gap-0.5 border-b-2 border-ink pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <p className="text-lg font-extrabold tracking-tight">{site.name}</p>
              <p className="text-sm text-muted">Record since {site.since}</p>
            </div>

            <dl className="mt-2">
              {rows.map((r) => (
                <div key={r.label} data-row className="flex h-[2.9rem] items-end justify-between gap-4 pb-1.5">
                  <dt className="text-muted">{r.label}</dt>
                  <dd className="text-lg font-bold">
                    {r.count ? <span data-count={r.value}>{r.value}</span> : r.value}
                    {r.suffix}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="h-20" aria-hidden="true" />

            <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-8" style={{ transform: "rotate(-12deg)" }} aria-hidden="true">
              <span data-ink-ring className="absolute inset-0 rounded-2xl border-4 border-stamp opacity-0" />
              <div
                data-stamp
                className="relative rounded-2xl border-[3.5px] border-stamp px-5 py-2 text-center text-stamp opacity-90"
                style={{ filter: "url(#ink-rough)" }}
              >
                <span className="block text-xs font-extrabold tracking-[0.3em]">SELECTED</span>
                <span className="block text-3xl font-extrabold leading-none">{site.selections}+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
