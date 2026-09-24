import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";

const moments = [
  { time: "6:00 am", angle: 90, sky: "#e8f5e2", ink: "#163a28", text: "An early start. The hall is calm and the day is all yours." },
  { time: "1:00 pm", angle: 195, sky: "#cfeac4", ink: "#163a28", text: "Afternoon heat outside, cool air in the AC section." },
  { time: "9:00 pm", angle: 315, sky: "#1f4a33", ink: "#e6f4e2", text: "Online class or mock test? The Wi-Fi stays on all night." },
  { time: "3:00 am", angle: 405, sky: "#0b1d14", ink: "#e6f4e2", text: "Last revision before the exam. The lights are still on." },
];

// Deterministic "random" star field so the markup is stable.
const stars = Array.from({ length: 34 }, (_, i) => {
  const r = (n) => {
    const x = Math.sin(i * 999 + n * 77) * 10000;
    return x - Math.floor(x);
  };
  return { left: r(1) * 100, top: r(2) * 70, size: 1.5 + r(3) * 2.5, delay: r(4) };
});

function Dial() {
  const ticks = Array.from({ length: 24 }, (_, h) => h);
  return (
    <svg viewBox="0 0 320 320" className="w-[min(58vw,260px)] md:w-full md:max-w-[420px]" role="img" aria-label="24-hour clock showing the hall is open every hour">
      {/* daylight half (6 am to 6 pm sits on the lower half of a 24h dial) */}
      <path d="M310 160A150 150 0 0 1 10 160Z" fill="var(--lamp)" opacity="0.16" />
      <circle cx="160" cy="160" r="150" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
      <circle cx="160" cy="160" r="118" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="18" />
      {ticks.map((h) => {
        const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
        const major = h % 6 === 0;
        const r1 = major ? 128 : 136;
        return (
          <line
            key={h}
            x1={160 + Math.cos(a) * r1}
            y1={160 + Math.sin(a) * r1}
            x2={160 + Math.cos(a) * 146}
            y2={160 + Math.sin(a) * 146}
            stroke="currentColor"
            strokeOpacity={major ? 0.9 : 0.4}
            strokeWidth={major ? 3 : 1.6}
            strokeLinecap="round"
          />
        );
      })}
      {[
        ["12 am", 160, 100],
        ["6 am", 222, 164],
        ["12 pm", 160, 228],
        ["6 pm", 98, 164],
      ].map(([t, x, y]) => (
        <text key={t} x={x} y={y} textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor" fillOpacity="0.7" fontFamily="inherit">
          {t}
        </text>
      ))}
      <g data-hand>
        <line x1="160" y1="160" x2="160" y2="44" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <circle cx="160" cy="44" r="16" fill="var(--lamp)" opacity="0.3" data-glow />
        <circle cx="160" cy="44" r="8" fill="var(--lamp)" />
      </g>
      <circle cx="160" cy="160" r="10" fill="currentColor" />
    </svg>
  );
}

export default function RoundTheClock() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);

  useGSAP(
    () => {
      const hand = stageRef.current.querySelector("[data-hand]");
      gsap.set(hand, { rotation: moments[0].angle, svgOrigin: "160 160" });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const caps = gsap.utils.toArray("[data-cap]", rootRef.current);
        gsap.set(caps.slice(1), { autoAlpha: 0, y: 40 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: 0.8,
            snap: { snapTo: [0, 1 / 3, 2 / 3, 1], duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: "power1.inOut" },
          },
        });

        moments.slice(1).forEach((m, i) => {
          tl.to(hand, { rotation: m.angle, svgOrigin: "160 160", duration: 1 }, i)
            .to(stageRef.current, { "--sky": m.sky, "--sky-ink": m.ink, duration: 1 }, i)
            .to(caps[i], { autoAlpha: 0, y: -40, duration: 0.3 }, i + 0.3)
            .to(caps[i + 1], { autoAlpha: 1, y: 0, duration: 0.3 }, i + 0.6);
        });

        tl.fromTo("[data-star]", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, stagger: { each: 0.02, from: "random" }, duration: 0.6 }, 1.6);
        tl.fromTo("[data-lamp-glow]", { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.7);

        // Stars twinkle on their own once they are out.
        gsap.to("[data-star]", {
          opacity: 0.35,
          duration: 1.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.15, from: "random" },
          delay: 1,
        });
        gsap.to("[data-glow]", { attr: { r: 24 }, opacity: 0.12, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="hours" ref={rootRef} className="relative">
      <div
        ref={stageRef}
        className="relative flex min-h-svh items-center overflow-hidden bg-[var(--sky)] text-[var(--sky-ink)]"
        style={{ "--sky": moments[0].sky, "--sky-ink": moments[0].ink }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {stars.map((s, i) => (
            <span
              key={i}
              data-star
              className="absolute rounded-full bg-[#fff6d8] opacity-0"
              style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            />
          ))}
          <div
            data-lamp-glow
            className="absolute bottom-[-20%] right-[-10%] h-[70vh] w-[70vh] rounded-full opacity-0"
            style={{ background: "radial-gradient(circle, rgb(244 185 66 / 0.28), transparent 65%)" }}
          />
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-20 md:grid-cols-[1.1fr_1fr] md:gap-12 md:py-24">
          <div>
            <h2 className="t-h2">Open 24 hours, 7 days a week.</h2>
            <p className="t-lead mt-5 hidden opacity-80 sm:block">
              Choose the study hours that suit you: early mornings, late nights, or both.
            </p>

            <ol className="mt-6 flex sm:mt-10 flex-col gap-6 motion-safe:grid motion-safe:gap-0">
              {moments.map((m) => (
                <li key={m.time} data-cap className="motion-safe:[grid-area:1/1]">
                  <p className="text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold leading-none tracking-tight">{m.time}</p>
                  <p className="mt-3 max-w-md text-lg opacity-85">{m.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex justify-center md:justify-end">
            <Dial />
          </div>
        </div>
      </div>
    </section>
  );
}
