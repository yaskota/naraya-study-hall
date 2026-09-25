import { useEffect } from "react";
import { ScrollTrigger } from "./lib/gsap";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Facilities from "./components/Facilities";
import Gallery from "./components/Gallery";
import RoundTheClock from "./components/RoundTheClock";
import Results from "./components/Results";
import Location from "./components/Location";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  // Web fonts change text heights; re-measure scroll positions once they're in.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Facilities />
        <Gallery />
        <RoundTheClock />
        <Results />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
