import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "../lib/gsap";
import { whatsappUrl } from "../data/site";
import { Icon } from "./icons";

// Floating "WhatsApp us" button. Pops in after the hero intro, pulses now and
// then, and steps aside when the footer (which has its own WhatsApp button) is on screen.
export default function WhatsAppButton() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const btn = rootRef.current;
      const footer = document.querySelector("footer");
      if (!btn || !footer) return;

      const hide = (hidden) =>
        gsap.to(btn, {
          autoAlpha: hidden ? 0 : 1,
          y: hidden ? 24 : 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });

      ScrollTrigger.create({
        trigger: footer,
        start: "top 85%",
        onEnter: () => hide(true),
        onLeaveBack: () => hide(false),
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(btn, { scale: 0.4, autoAlpha: 0, y: 30, duration: 0.7, ease: "back.out(2.2)", delay: 1.6 });
        gsap.fromTo(
          "[data-wa-ring]",
          { scale: 1, opacity: 0.55 },
          { scale: 1.6, opacity: 0, duration: 1.4, ease: "power2.out", repeat: -1, repeatDelay: 3.5, delay: 2.6 }
        );
      });
    },
    { scope: rootRef }
  );

  if (!whatsappUrl) return null;

  return (
    <a
      ref={rootRef}
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 z-40 inline-flex items-center gap-2 rounded-full bg-deep py-3 pl-3.5 pr-5 font-semibold text-on-deep shadow-soft ring-1 ring-on-deep/15 transition-[translate] duration-200 hover:-translate-y-0.5 sm:right-6"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-full bg-[#25d366] text-[#06301a]">
        <span data-wa-ring aria-hidden="true" className="absolute inset-0 rounded-full bg-[#25d366] opacity-0" />
        <Icon.Chat className="relative h-[18px] w-[18px]" />
      </span>
      WhatsApp us
    </a>
  );
}
