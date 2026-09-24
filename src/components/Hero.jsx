import { useRef } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap";
import { site } from "../data/site";
import { Icon } from "./icons";
import SeatMap from "./SeatMap";

export default function Hero() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Headline rises line by line out of a mask.
        SplitText.create(titleRef.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.12,
              delay: 0.2,
            }),
        });

        gsap.from("[data-hero-fade]", {
          y: 22,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.7,
        });

        // The green wall block slides in behind the floor plan.
        gsap.from("[data-wall]", {
          xPercent: 40,
          opacity: 0,
          duration: 1.4,
          ease: "expo.out",
          delay: 0.1,
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="top" ref={rootRef} className="relative overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28">
      <div
        data-wall
        aria-hidden="true"
        className="absolute right-0 top-0 hidden h-[88%] w-[46%] rounded-bl-[72px] bg-wall lg:block"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h1 ref={titleRef} className="t-hero">
            A quiet seat for every hour of your preparation.
          </h1>

          <p data-hero-fade className="t-lead mt-7 text-muted">
            {site.name} is a {site.totalSeats}-seat study space with AC and non-AC sections, free Wi-Fi and doors
            that stay open 24 hours a day, 7 days a week.
          </p>

          <div data-hero-fade className="mt-9 flex flex-wrap gap-3">
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-leaf px-6 py-3.5 text-base font-semibold text-on-leaf shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <Icon.Pin className="h-5 w-5" />
              Get directions
            </a>
            <a
              href="#facilities"
              className="inline-flex items-center rounded-2xl border border-line bg-surface px-6 py-3.5 text-base font-semibold transition-colors hover:bg-wall"
            >
              See facilities
            </a>
          </div>

          <ul data-hero-fade className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[0.95rem] font-medium text-muted">
            <li className="flex items-center gap-2">
              <Icon.Clock className="h-5 w-5 text-leaf" /> Open 24/7
            </li>
            <li className="flex items-center gap-2">
              <Icon.Seat className="h-5 w-5 text-leaf" /> {site.totalSeats} seats
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lamp" /> Since {site.since}
            </li>
            {site.google && (
              <li className="flex items-center gap-2">
                <Icon.Star className="h-5 w-5 text-lamp" /> {site.google.rating} on Google ({site.google.reviews} reviews)
              </li>
            )}
          </ul>
        </div>

        <div id="hall" className="relative lg:pl-4">
          <SeatMap />
        </div>
      </div>
    </section>
  );
}
