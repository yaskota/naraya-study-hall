import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, HOVER_MOTION } from "../lib/gsap";

/* ---------- Animated illustrations, one per card ---------- */

function WifiArt() {
  return (
    <svg viewBox="0 0 120 96" className="h-28 w-36 sm:h-36 sm:w-44" aria-hidden="true">
      {[
        "M10 38a72 72 0 0 1 100 0",
        "M26 54a50 50 0 0 1 68 0",
        "M42 70a27 27 0 0 1 36 0",
      ].map((d, i) => (
        <path key={i} data-arc d={d} fill="none" stroke="var(--seat-fan)" strokeWidth="9" strokeLinecap="round" />
      ))}
      <circle data-arc cx="60" cy="84" r="7" fill="var(--lamp)" />
    </svg>
  );
}

function Snowflake() {
  return (
    <svg data-snow viewBox="0 0 48 48" className="h-14 w-14" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
        {[0, 60, 120].map((a) => (
          <g key={a} transform={`rotate(${a} 24 24)`}>
            <path d="M24 5v38M24 11l-5-5M24 11l5-5M24 37l-5 5M24 37l5 5" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Fan() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" aria-hidden="true">
      <g data-fan style={{ transformOrigin: "24px 24px" }} fill="currentColor">
        {[0, 120, 240].map((a) => (
          <path key={a} transform={`rotate(${a} 24 24)`} d="M24 24c-3-6-2-15 4-17 5-1 6 6 2 10-2 2-4 4-6 7Z" />
        ))}
      </g>
      <circle cx="24" cy="24" r="4" fill="var(--surface)" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function WaterDrop() {
  return (
    <svg viewBox="0 0 80 96" className="h-24 w-20" aria-hidden="true">
      <defs>
        <clipPath id="drop-clip">
          <path d="M40 6C40 6 14 38 14 56a26 26 0 0 0 52 0C66 38 40 6 40 6Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#drop-clip)">
        <rect x="0" y="0" width="80" height="96" fill="var(--wall)" />
        <g data-water>
          <path
            d="M-80 0q10-6 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 V96 H-80Z"
            fill="var(--seat-ac)"
            transform="translate(0 40)"
          />
        </g>
      </g>
      <path
        d="M40 6C40 6 14 38 14 56a26 26 0 0 0 52 0C66 38 40 6 40 6Z"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="3"
      />
      <path d="M28 58a13 13 0 0 0 9 12" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  );
}

function Washroom() {
  return (
    <svg viewBox="0 0 64 64" className="h-20 w-20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path data-line pathLength="1" d="M14 58V10a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v48" />
      <path data-line pathLength="1" d="M6 58h52" />
      <circle data-line pathLength="1" cx="32" cy="20" r="4.5" />
      <path data-line pathLength="1" d="M32 27v14M24 32h16M32 41l-6 11M32 41l6 11" />
    </svg>
  );
}

function ParkingArt() {
  return (
    <svg viewBox="0 0 240 90" className="h-20 w-full max-w-[260px]" aria-hidden="true">
      <path d="M0 80h240" stroke="var(--line)" strokeWidth="3" />
      {[70, 150].map((x) => (
        <path key={x} d={`M${x} 80V56`} stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
      ))}
      <g transform="translate(206 20)">
        <path d="M8 60V26" stroke="var(--muted)" strokeWidth="3" />
        <rect width="18" height="22" rx="4" fill="var(--leaf)" />
        <text x="9" y="16" textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--on-leaf)" fontFamily="inherit">
          P
        </text>
      </g>
      <g data-scooter>
        <circle cx="86" cy="70" r="9" fill="none" stroke="var(--ink)" strokeWidth="4" />
        <circle cx="132" cy="70" r="9" fill="none" stroke="var(--ink)" strokeWidth="4" />
        <path d="M92 64c4-12 12-16 26-16h8l8 16" fill="var(--seat-fan)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        <path d="M100 46h16" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
        <path d="M126 48l4-20h8" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function QuietBars() {
  return (
    <div className="flex h-16 items-end gap-[5px]" aria-hidden="true">
      {Array.from({ length: 22 }, (_, i) => (
        <span key={i} data-bar className="block h-full w-[6px] origin-bottom rounded-full bg-seat-ac" style={{ transform: "scaleY(0.12)" }} />
      ))}
    </div>
  );
}

/* ---------- Section ---------- */

const cardBase =
  "fac-card group relative overflow-hidden rounded-[28px] border p-6 sm:p-7 [--mx:50%] [--my:50%] before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:content-[''] hover:before:opacity-100";

const glow = "before:bg-[radial-gradient(420px_circle_at_var(--mx)_var(--my),rgb(255_255_255/0.14),transparent_45%)]";
const glowLight = "before:bg-[radial-gradient(420px_circle_at_var(--mx)_var(--my),var(--wall),transparent_50%)]";

export default function Facilities() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Heading: words slide up.
        gsap.from("[data-fac-head] > *", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-fac-head]", start: "top 85%" },
        });

        // Cards open like shutters, in batches as they arrive.
        const cards = gsap.utils.toArray(".fac-card", root);
        gsap.set(cards, { clipPath: "inset(20% 10% 0% 10% round 28px)", y: 70, opacity: 0 });
        ScrollTrigger.batch(cards, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "expo.out",
              stagger: 0.12,
              onComplete: () => gsap.set(batch, { clearProps: "clipPath" }),
            }),
        });

        const inView = (el, anim, loop) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top 80%",
            end: "bottom top",
            animation: anim,
            toggleActions: loop ? "play pause resume pause" : "play none none none",
          });

        // Wi-Fi: signal arcs pulse outward in a loop.
        inView(
          "[data-card=wifi]",
          gsap.fromTo(
            "[data-arc]",
            { opacity: 0.15 },
            { opacity: 1, duration: 0.45, stagger: { each: 0.22, from: "end" }, repeat: -1, repeatDelay: 0.6, yoyo: true, paused: true }
          ),
          true
        );

        // AC: snowflake turns slowly. Non-AC: fan spins.
        inView("[data-card=ac]", gsap.to("[data-snow]", { rotate: 360, duration: 9, ease: "none", repeat: -1, paused: true }), true);
        inView("[data-card=ac]", gsap.to("[data-fan]", { rotate: 360, duration: 1.1, ease: "none", repeat: -1, paused: true }), true);

        // Water: the drop fills and the surface keeps rippling.
        const water = gsap.timeline({ paused: true });
        water
          .fromTo("[data-water]", { y: 50 }, { y: 0, duration: 1.6, ease: "power2.out" })
          .to("[data-water] path", { x: 40, duration: 1.6, ease: "none", repeat: -1 }, 0);
        inView("[data-card=water]", water, true);

        // Washroom: the icon draws itself.
        inView(
          "[data-card=washroom]",
          gsap.fromTo(
            "[data-line]",
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", stagger: 0.18, paused: true }
          )
        );

        // Parking: the scooter rolls into its bay and settles.
        inView(
          "[data-card=parking]",
          gsap
            .timeline({ paused: true })
            .fromTo("[data-scooter]", { x: -160 }, { x: 0, duration: 1.3, ease: "power3.out" })
            .to("[data-scooter]", { y: -3, duration: 0.12, yoyo: true, repeat: 1, ease: "sine.inOut" })
        );

        // Quiet: noisy bars fall to a calm, breathing line.
        const bars = gsap.utils.toArray("[data-bar]", root);
        const quiet = gsap.timeline({ paused: true });
        quiet
          .fromTo(bars, { scaleY: () => gsap.utils.random(0.35, 1) }, { scaleY: () => gsap.utils.random(0.4, 1), duration: 0.14, repeat: 5, yoyo: true, stagger: 0.01, ease: "none" })
          .to(bars, { scaleY: 0.12, duration: 0.9, ease: "power3.out", stagger: { each: 0.03, from: "edges" } })
          .to(bars, { scaleY: 0.22, duration: 1.4, ease: "sine.inOut", stagger: { each: 0.08, repeat: -1, yoyo: true } });
        inView("[data-card=quiet]", quiet, true);
      });

      // Pointer-follow glow and a small tilt on devices with real hover.
      mm.add(HOVER_MOTION, () => {
        const cards = gsap.utils.toArray(".fac-card", root);
        const cleanups = cards.map((card) => {
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
          gsap.set(card, { transformPerspective: 900 });
          const move = (e) => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            card.style.setProperty("--mx", `${px * 100}%`);
            card.style.setProperty("--my", `${py * 100}%`);
            ry((px - 0.5) * 6);
            rx(-(py - 0.5) * 6);
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
        return () => cleanups.forEach((c) => c());
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="facilities" ref={rootRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div data-fac-head className="mb-12 max-w-2xl sm:mb-16">
          <h2 className="t-h2">Everything a long study day needs.</h2>
          <p className="t-lead mt-5 text-muted">
            The basics are covered, so the only thing you need to bring is your syllabus.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[minmax(230px,auto)]">
          {/* Wi-Fi: the big one */}
          <article data-card="wifi" className={`${cardBase} ${glow} flex flex-col justify-between border-transparent bg-deep text-on-deep sm:col-span-2 md:row-span-2`}>
            <WifiArt />
            <div className="mt-10">
              <h3 className="t-h2 text-[clamp(1.9rem,3.4vw,2.9rem)]">Free Wi-Fi, day and night.</h3>
              <p className="mt-4 max-w-md text-[1.05rem] text-on-deep/75">
                Internet stays on around the clock for online classes, study material and mock tests.
              </p>
            </div>
          </article>

          {/* AC and non-AC */}
          <article data-card="ac" className={`${cardBase} ${glowLight} grid grid-cols-2 gap-0 border-line bg-surface p-0! sm:col-span-2`}>
            <div className="flex flex-col justify-between bg-seat-ac/25 p-6 text-[color-mix(in_oklab,var(--seat-ac)_55%,var(--ink))]">
              <Snowflake />
              <p className="mt-6 text-lg font-bold text-ink">AC section</p>
            </div>
            <div className="flex flex-col justify-between bg-seat-fan/25 p-6 text-[color-mix(in_oklab,var(--seat-fan)_55%,var(--ink))]">
              <Fan />
              <p className="mt-6 text-lg font-bold text-ink">Non-AC section</p>
            </div>
            <p className="col-span-2 border-t border-line p-6 text-muted">
              Two sections, so you can study wherever you are most comfortable.
            </p>
          </article>

          {/* Water */}
          <article data-card="water" className={`${cardBase} ${glowLight} flex flex-col justify-between border-line bg-surface`}>
            <WaterDrop />
            <div className="mt-6">
              <h3 className="t-h3">Drinking water</h3>
              <p className="mt-2 text-muted">Available whenever you need a refill.</p>
            </div>
          </article>

          {/* Washroom */}
          <article data-card="washroom" className={`${cardBase} ${glowLight} flex flex-col justify-between border-line bg-wall text-leaf`}>
            <Washroom />
            <div className="mt-6 text-ink">
              <h3 className="t-h3">Accessible washrooms</h3>
              <p className="mt-2 text-muted">Easy to reach from the hall.</p>
            </div>
          </article>

          {/* Parking */}
          <article data-card="parking" className={`${cardBase} ${glowLight} flex flex-col justify-between gap-6 border-line bg-surface sm:col-span-2`}>
            <ParkingArt />
            <div>
              <h3 className="t-h3">Ground-floor parking</h3>
              <p className="mt-2 text-muted">Park downstairs and walk straight in.</p>
            </div>
          </article>

          {/* Quiet */}
          <article data-card="quiet" className={`${cardBase} ${glowLight} flex flex-col justify-between gap-6 border-line bg-wall sm:col-span-2`}>
            <QuietBars />
            <div>
              <h3 className="t-h3">Calm, study-first room</h3>
              <p className="mt-2 text-muted">Comfortable seats and a peaceful atmosphere, made for long hours.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
