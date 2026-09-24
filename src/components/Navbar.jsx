import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "../lib/gsap";
import { site } from "../data/site";
import { Icon } from "./icons";

const links = [
  { href: "#hall", label: "Floor plan" },
  { href: "#facilities", label: "Facilities" },
  { href: "#photos", label: "Photos" },
  { href: "#hours", label: "Hours" },
  { href: "#location", label: "Location" },
];

function readStoredTheme() {
  try {
    return localStorage.getItem("naraya-theme") || "";
  } catch {
    return "";
  }
}

function useTheme() {
  const [theme, setTheme] = useState(readStoredTheme);
  const systemDark =
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.dataset.theme = theme;
    else delete root.dataset.theme;
    try {
      if (theme) localStorage.setItem("naraya-theme", theme);
      else localStorage.removeItem("naraya-theme");
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  }, [theme]);

  const isDark = theme ? theme === "dark" : systemDark;
  return [isDark, () => setTheme(isDark ? "light" : "dark")];
}

export function LogoMark({ className = "" }) {
  // A tiny 3x3 floor plan: the same seats that anchor the hero.
  const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <svg viewBox="0 0 30 30" className={className} aria-hidden="true">
      <rect width="30" height="30" rx="8" fill="var(--ink)" />
      {cells.map((i) => (
        <rect
          key={i}
          x={6 + (i % 3) * 6.6}
          y={6 + Math.floor(i / 3) * 6.6}
          width="4.8"
          height="4.8"
          rx="1.4"
          fill={i < 3 ? "var(--seat-ac)" : i === 4 ? "var(--lamp)" : "var(--seat-fan)"}
        />
      ))}
    </svg>
  );
}

export default function Navbar() {
  const headerRef = useRef(null);
  const panelRef = useRef(null);
  const menuOpenRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, toggleTheme] = useTheme();

  const { contextSafe } = useGSAP(
    () => {
      const header = headerRef.current;

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          header.dataset.scrolled = self.scroll() > 24 ? "true" : "false";
        },
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(header, { yPercent: -120, duration: 0.9, ease: "power3.out", delay: 0.15 });

        // Slide away while reading down the page, come back on any upward scroll.
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (menuOpenRef.current) return;
            const hide = self.direction === 1 && self.scroll() > 480;
            gsap.to(header, {
              yPercent: hide ? -130 : 0,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            });
          },
        });
      });
    },
    { scope: headerRef }
  );

  const toggleMenu = contextSafe(() => {
    const next = !menuOpenRef.current;
    menuOpenRef.current = next;
    setMenuOpen(next);
    const panel = panelRef.current;
    const items = panel.querySelectorAll("[data-menu-item]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (next) {
      gsap.set(panel, { display: "block" });
      gsap.fromTo(
        panel,
        { clipPath: "inset(0% 0% 100% 0% round 20px)" },
        { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: reduce ? 0 : 0.55, ease: "expo.out" }
      );
      gsap.fromTo(
        items,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: reduce ? 0 : 0.45, ease: "power3.out", delay: 0.08 }
      );
    } else {
      gsap.to(panel, {
        clipPath: "inset(0% 0% 100% 0% round 20px)",
        duration: reduce ? 0 : 0.35,
        ease: "power2.in",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    }
  });

  const closeMenu = () => {
    if (menuOpenRef.current) toggleMenu();
  };

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      className="group fixed inset-x-0 top-0 z-50 px-3 sm:px-5"
      style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.75rem)" }}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-transparent px-3 py-2 transition-all duration-300 group-data-[scrolled=true]:border-line group-data-[scrolled=true]:bg-surface/85 group-data-[scrolled=true]:shadow-soft group-data-[scrolled=true]:backdrop-blur-md sm:px-4">
        <a href="#top" className="flex items-center gap-2.5 rounded-lg" onClick={closeMenu}>
          <LogoMark className="h-8 w-8" />
          <span className="text-[1.05rem] font-bold tracking-tight">{site.name}</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-[0.95rem] font-medium text-muted transition-colors hover:bg-wall hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-xl text-ink transition-colors hover:bg-wall"
            aria-label={isDark ? "Switch to day theme" : "Switch to night theme"}
            title={isDark ? "Day theme" : "Night theme"}
          >
            {isDark ? <Icon.Sun className="h-5 w-5" /> : <Icon.Moon className="h-5 w-5" />}
          </button>
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl bg-leaf px-4 py-2.5 text-[0.95rem] font-semibold text-on-leaf transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Get directions
          </a>
          <button
            type="button"
            onClick={toggleMenu}
            className="grid h-10 w-10 place-items-center rounded-xl text-ink hover:bg-wall lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <Icon.Close className="h-5 w-5" /> : <Icon.Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          id="mobile-menu"
          ref={panelRef}
          className="absolute inset-x-0 top-[calc(100%+0.5rem)] hidden rounded-[20px] border border-line bg-surface p-3 shadow-soft lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-menu-item
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-lg font-semibold hover:bg-wall"
              >
                {l.label}
              </a>
            ))}
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noreferrer"
              data-menu-item
              className="mt-2 rounded-xl bg-leaf px-4 py-3 text-center text-lg font-semibold text-on-leaf"
            >
              Get directions
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
