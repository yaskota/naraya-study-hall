import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, DESKTOP_MOTION } from "../lib/gsap";
import { site } from "../data/site";
import { Icon } from "./icons";
import HallScene from "./HallScene";

function Photo({ photo, eager = false }) {
  return photo.src ? (
    <img
      src={photo.src}
      alt={photo.title}
      loading={eager ? "eager" : "lazy"}
      className="h-full w-full object-cover"
    />
  ) : (
    <HallScene scene={photo.scene} title={photo.title} />
  );
}

function Lightbox({ index, onClose, onStep }) {
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const photo = site.photos[index];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.from(rootRef.current, { opacity: 0, duration: reduce ? 0 : 0.3 });
      gsap.from("[data-lb-figure]", {
        scale: 0.9,
        y: 30,
        opacity: 0,
        duration: reduce ? 0 : 0.55,
        ease: "expo.out",
      });
    },
    { scope: rootRef }
  );

  // Slide the picture in the direction of travel when stepping through.
  const prev = useRef(index);
  useGSAP(
    () => {
      if (prev.current === index) return;
      const dir = index > prev.current ? 1 : -1;
      prev.current = index;
      gsap.fromTo("[data-lb-img]", { xPercent: 12 * dir, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
    },
    { dependencies: [index], scope: rootRef }
  );

  useEffect(() => {
    const before = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      before?.focus?.();
    };
  }, [onClose, onStep]);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      className="fixed inset-0 z-[100] grid place-items-center bg-deep/90 p-4 backdrop-blur-sm sm:p-10"
      style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 1rem)", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <figure data-lb-figure className="w-full max-w-5xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-wall sm:aspect-[16/10]">
          <div data-lb-img className="absolute inset-0">
            <Photo photo={photo} eager />
          </div>
        </div>
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-on-deep">
          <div>
            <p className="text-xl font-bold">{photo.title}</p>
            <p className="t-note text-on-deep/70">{photo.note}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-2 text-sm text-on-deep/70">
              {index + 1} of {site.photos.length}
            </span>
            <button type="button" onClick={() => onStep(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center rounded-full bg-on-deep/10 hover:bg-on-deep/20">
              <Icon.Left className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => onStep(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center rounded-full bg-on-deep/10 hover:bg-on-deep/20">
              <Icon.Right className="h-5 w-5" />
            </button>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo" className="ml-1 grid h-11 w-11 place-items-center rounded-full bg-on-deep text-deep">
              <Icon.Close className="h-5 w-5" />
            </button>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default function Gallery() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const [open, setOpen] = useState(null);
  const count = site.photos.length;

  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + count) % count)), [count]);
  const close = useCallback(() => setOpen(null), []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: the section pins and the photo strip travels sideways.
      mm.add(DESKTOP_MOTION, () => {
        const track = trackRef.current;
        gsap.set(track.parentElement, { overflowX: "hidden" });
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const travel = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
          },
        });

        gsap.utils.toArray("[data-frame]", rootRef.current).forEach((frame, i) => {
          const pane = frame.querySelector("[data-pane]");
          const inner = frame.querySelector("[data-inner]");
          const note = frame.querySelector("[data-caption]");

          // Each frame is wiped open as it slides into view, tilting upright.
          if (i > 0 && pane) {
            gsap.fromTo(
              pane,
              { clipPath: "inset(12% 0% 12% 70% round 28px)", rotate: 4 },
              {
                clipPath: "inset(0% 0% 0% 0% round 28px)",
                rotate: 0,
                ease: "none",
                scrollTrigger: { trigger: frame, containerAnimation: travel, start: "left 100%", end: "left 55%", scrub: true },
              }
            );
            if (note) gsap.from(note, {
              y: 24,
              opacity: 0,
              ease: "none",
              scrollTrigger: { trigger: frame, containerAnimation: travel, start: "left 80%", end: "left 55%", scrub: true },
            });
          }

          // The picture drifts inside its frame: a window-on-the-room parallax.
          if (inner) gsap.fromTo(
            inner,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: frame, containerAnimation: travel, start: "left right", end: "right left", scrub: true },
            }
          );
        });
      });

      // Mobile: frames rise out of a mask as they scroll in, with vertical parallax.
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray("[data-frame]", rootRef.current).forEach((frame) => {
          const pane = frame.querySelector("[data-pane]");
          const inner = frame.querySelector("[data-inner]");
          if (!pane) return;
          gsap.fromTo(
            pane,
            { clipPath: "inset(40% 8% 0% 8% round 24px)" },
            {
              clipPath: "inset(0% 0% 0% 0% round 24px)",
              ease: "power2.out",
              scrollTrigger: { trigger: frame, start: "top 95%", end: "top 55%", scrub: true },
            }
          );
          if (inner) gsap.fromTo(
            inner,
            { yPercent: -6 },
            { yPercent: 6, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } }
          );
        });
      });

      // Heading reveal (all sizes).
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-gal-head] > *", {
          y: 34,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <>
      <section
        id="photos"
        ref={rootRef}
        className="relative overflow-hidden bg-wall py-24 md:flex md:h-svh md:flex-col md:justify-center md:py-0"
      >
        <div data-gal-head className="mx-auto mb-10 w-full max-w-6xl px-5 md:mb-8">
          <h2 className="t-h2">Take a look inside.</h2>
          <p className="t-lead mt-4 text-muted">Tap any picture to open it full size.</p>
        </div>

        <div className="gallery-clip">
          <div
            ref={trackRef}
            className="flex flex-col gap-10 px-5 md:w-max md:flex-row md:items-start md:gap-8 md:pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))] md:pr-[12vw]"
          >
            {site.photos.map((photo, i) => (
              <figure key={photo.title} data-frame className="shrink-0">
                <button
                  type="button"
                  data-pane
                  onClick={() => setOpen(i)}
                  aria-label={`Open photo: ${photo.title}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-wall-deep shadow-soft md:h-[min(56vh,520px)] md:w-auto md:rounded-[28px]"
                >
                  <div data-inner className="absolute inset-y-[-6%] inset-x-[-9%]">
                    <Photo photo={photo} eager={i === 0} />
                  </div>
                </button>
                <figcaption data-caption className="mt-4 flex flex-col gap-0.5 px-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <span className="text-lg font-bold">{photo.title}</span>
                  <span className="t-note text-leaf">{photo.note}</span>
                </figcaption>
              </figure>
            ))}

            <div data-frame className="flex shrink-0 flex-col justify-center md:h-[min(56vh,520px)] md:w-[min(34vw,420px)]">
              <div data-pane className="rounded-[28px] bg-deep p-8 text-on-deep">
                <div>
                  <p className="t-h3 text-[1.9rem]">Come and see it for yourself.</p>
                  <p className="mt-3 text-on-deep/75">The hall never closes, so any time is a good time to visit.</p>
                  <a
                    href={site.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-lamp px-5 py-3 font-semibold text-[#1d2a12]"
                  >
                    <Icon.Pin className="h-5 w-5" /> Get directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 hidden w-full max-w-6xl px-5 md:block" aria-hidden="true">
          <div className="h-1 overflow-hidden rounded-full bg-wall-deep">
            <div data-progress className="h-full origin-left rounded-full bg-leaf" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </section>

      {open !== null && <Lightbox index={open} onClose={close} onStep={step} />}
    </>
  );
}
