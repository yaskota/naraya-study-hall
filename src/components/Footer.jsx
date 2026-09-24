import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap";
import { site } from "../data/site";
import { Icon } from "./icons";
import { LogoMark } from "./Navbar";

const LAMPS = 180;

export default function Footer() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Desk lamps across the hall switch on and off at random, like a late night.
        gsap.to("[data-lamp]", {
          opacity: 0.9,
          duration: 1.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.09, from: "random", repeat: -1, yoyo: true },
        });

        SplitText.create(titleRef.current, {
          type: "words,chars",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 60,
              opacity: 0,
              rotate: () => gsap.utils.random(-12, 12),
              stagger: 0.025,
              duration: 0.7,
              ease: "back.out(2)",
              scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
            }),
        });

        gsap.from("[data-cta-fade]", {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <footer ref={rootRef} className="relative overflow-hidden bg-deep text-on-deep">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-[repeat(auto-fill,minmax(26px,1fr))] gap-3 overflow-hidden p-6 opacity-70 sm:gap-4 [max-height:70%]">
        {Array.from({ length: LAMPS }, (_, i) => (
          <span key={i} data-lamp className="seat seat-fan" style={{ opacity: 0.08 }} />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 0%, var(--deep) 75%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-28 sm:pt-36">
        <h2 ref={titleRef} className="t-hero max-w-3xl">
          Your seat is waiting.
        </h2>
        <p data-cta-fade className="t-lead mt-6 text-on-deep/75">
          Open 24 hours, 7 days a week. Come in whenever your preparation needs you to.
        </p>
        <div data-cta-fade className="mt-9 flex flex-wrap gap-3">
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-lamp px-6 py-3.5 font-semibold text-[#1d2a12] transition-transform hover:-translate-y-0.5"
          >
            <Icon.Pin className="h-5 w-5" /> Get directions
          </a>
          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 rounded-2xl border border-on-deep/25 px-6 py-3.5 font-semibold hover:bg-on-deep/10"
            >
              <Icon.Phone className="h-5 w-5" /> Call {site.phone}
            </a>
          )}
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-on-deep/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <LogoMark className="h-9 w-9" />
            <div>
              <p className="font-bold">{site.name}</p>
              <p className="text-sm text-on-deep/65">{site.shortAddress || `Since ${site.since}`}</p>
            </div>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-on-deep/75">
            <a href="#hall" className="hover:text-on-deep">Floor plan</a>
            <a href="#facilities" className="hover:text-on-deep">Facilities</a>
            <a href="#photos" className="hover:text-on-deep">Photos</a>
            <a href="#location" className="hover:text-on-deep">Location</a>
          </nav>
          <p className="text-sm text-on-deep/55">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
