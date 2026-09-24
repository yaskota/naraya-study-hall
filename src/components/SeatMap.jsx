import { useRef, useState } from "react";
import { gsap, useGSAP, MOTION_OK, HOVER_MOTION } from "../lib/gsap";
import { site } from "../data/site";

const COLS = 15;

const filters = [
  { id: "all", label: "All seats" },
  { id: "ac", label: "AC" },
  { id: "fan", label: "Non-AC" },
];

function SeatGrid({ from, count, type }) {
  return (
    <div className="grid gap-[3px] sm:gap-1.5" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
      {Array.from({ length: count }, (_, i) => {
        const n = from + i;
        return <span key={n} className={`seat seat-${type}`} data-type={type} data-seat={n} />;
      })}
    </div>
  );
}

export default function SeatMap() {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const tipRef = useRef(null);
  const prevFilter = useRef("all");
  const [filter, setFilter] = useState("all");

  const acCount = Math.min(site.acSeats, site.totalSeats);
  const fanCount = site.totalSeats - acCount;
  const rows = Math.ceil(site.totalSeats / COLS);

  // Intro: seats pop in from the middle of the hall outwards, then the note's arrow draws itself.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const seats = gsap.utils.toArray(".seat", rootRef.current);
        const tl = gsap.timeline({ delay: 0.45 });
        tl.from(cardRef.current, { y: 40, rotate: 2, opacity: 0, duration: 0.9, ease: "power3.out" })
          .from(
            seats,
            {
              scale: 0,
              opacity: 0,
              duration: 0.55,
              ease: "back.out(2.4)",
              stagger: { each: 0.012, grid: [rows, COLS], from: "center" },
            },
            "-=0.5"
          )
          .from("[data-tape]", { scaleX: 0, duration: 0.35, ease: "power2.out", stagger: 0.1 }, "-=0.9")
          .from("[data-note]", { opacity: 0, y: 8, duration: 0.4 }, "-=0.3")
          .fromTo(
            "[data-draw]",
            { strokeDashoffset: 120 },
            { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
            "<"
          );

        // The whole sheet drifts gently as the page scrolls past.
        gsap.to(cardRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top 30%", end: "bottom top", scrub: true },
        });
      });

      // Pointer tilt, only where there is a real hover.
      mm.add(HOVER_MOTION, () => {
        const card = cardRef.current;
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        gsap.set(card, { transformPerspective: 1100 });
        const move = (e) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        return () => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: rootRef }
  );

  // Filter: the chosen section lifts, the other dims back.
  useGSAP(
    () => {
      if (prevFilter.current === filter) return;
      prevFilter.current = filter;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const seats = gsap.utils.toArray(".seat", rootRef.current);
      const on = filter === "all" ? seats : seats.filter((s) => s.dataset.type === filter);
      const off = seats.filter((s) => !on.includes(s));

      gsap.to(off, {
        opacity: 0.2,
        scale: 0.78,
        duration: reduce ? 0 : 0.35,
        ease: "power2.out",
        stagger: reduce ? 0 : { each: 0.003, from: "random" },
        overwrite: "auto",
      });
      gsap.to(on, {
        opacity: 1,
        scale: 1,
        duration: reduce ? 0 : 0.5,
        ease: "back.out(2.2)",
        stagger: reduce ? 0 : { each: 0.006, grid: "auto", from: filter === "fan" ? "end" : "start" },
        overwrite: "auto",
      });
    },
    { dependencies: [filter], scope: rootRef }
  );

  const { contextSafe } = useGSAP({ scope: rootRef });

  const showTip = contextSafe((e) => {
    const seat = e.target.closest?.(".seat");
    const tip = tipRef.current;
    if (!seat || !tip) return;
    const host = cardRef.current.getBoundingClientRect();
    const r = seat.getBoundingClientRect();
    tip.textContent = `Seat ${seat.dataset.seat}, ${seat.dataset.type === "ac" ? "AC" : "non-AC"} section`;
    gsap.to(tip, {
      x: r.left - host.left + r.width / 2,
      y: r.top - host.top - 8,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  const hideTip = contextSafe(() => gsap.to(tipRef.current, { opacity: 0, duration: 0.2 }));

  return (
    <div ref={rootRef} className="relative">
      <div
        ref={cardRef}
        className="relative rounded-[26px] border border-line bg-surface p-4 shadow-soft will-change-transform sm:p-6 lg:-rotate-1"
        onPointerOver={showTip}
        onPointerLeave={hideTip}
      >
        <span
          data-tape
          aria-hidden="true"
          className="absolute -top-3 left-8 h-6 w-20 origin-left -rotate-6 rounded-sm bg-lamp/55"
        />
        <span
          data-tape
          aria-hidden="true"
          className="absolute -top-3 right-10 h-6 w-16 origin-left rotate-3 rounded-sm bg-seat-ac/55"
        />

        <h2 className="text-lg font-bold tracking-tight">The hall, seat by seat</h2>
        <div className="mb-5 mt-3 flex items-center gap-3">
          <div role="group" aria-label="Highlight seats" className="flex rounded-xl bg-wall p-1">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-muted transition-colors aria-pressed:bg-surface aria-pressed:text-ink aria-pressed:shadow-sm"
              >
                {f.label}
              </button>
            ))}
          </div>
          <div data-note className="hidden items-center gap-1 text-leaf min-[420px]:flex" aria-hidden="true">
            <svg width="44" height="26" viewBox="0 0 44 26" fill="none">
              <path
                data-draw
                d="M42 18C30 22 16 20 6 10m0 0 1 9m-1-9 9 1"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="120"
              />
            </svg>
            <span className="t-note -rotate-3 whitespace-nowrap">pick your side</span>
          </div>
        </div>

        <div
          role="img"
          aria-label={`Floor plan with ${site.totalSeats} seats: ${acCount} in the AC section and ${fanCount} in the non-AC section.`}
        >
          {acCount > 0 && (
            <>
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-muted" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-seat-ac" /> AC section, {acCount} seats
              </p>
              <SeatGrid from={1} count={acCount} type="ac" />
            </>
          )}

          {acCount > 0 && fanCount > 0 && (
            <div className="relative my-4 border-t-2 border-dashed border-line" aria-hidden="true" />
          )}

          {fanCount > 0 && (
            <>
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-muted" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-seat-fan" /> Non-AC section, {fanCount} seats
              </p>
              <SeatGrid from={acCount + 1} count={fanCount} type="fan" />
            </>
          )}

          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-muted" aria-hidden="true">
            <span className="h-1 w-10 rounded-full bg-line" />
            Entrance
            <span className="h-1 w-10 rounded-full bg-line" />
          </div>
        </div>

        <div
          ref={tipRef}
          role="presentation"
          className="pointer-events-none absolute left-0 top-0 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-deep px-2.5 py-1 text-xs font-semibold text-on-deep opacity-0"
        />
      </div>
    </div>
  );
}
