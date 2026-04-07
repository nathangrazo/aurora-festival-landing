import { AnimatePresence } from "motion/react";
import { useCallback, useState } from "react";
import { Cursor } from "./components/Cursor";
import { Experience } from "./components/Experience";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Lineup } from "./components/Lineup";
import { Navbar } from "./components/Navbar";
import { Preloader } from "./components/Preloader";
import { Schedule } from "./components/Schedule";
import { Stats } from "./components/Stats";
import { Tickets } from "./components/Tickets";
import { VelocityMarquee } from "./components/VelocityMarquee";
import { ZoomParallax } from "./components/ZoomParallax";
import { ARTISTS } from "./data/festival";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);
  useSmoothScroll(loaded);

  return (
    <>
      <Cursor />
      <AnimatePresence>{!loaded && <Preloader key="preloader" onDone={handleLoaded} />}</AnimatePresence>

      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <VelocityMarquee
              items={ARTISTS.map((a) => a.name)}
              className="border-y border-white/10 py-6 text-4xl font-bold tracking-tight sm:text-6xl"
            />
            <Lineup />
            <div className="px-5">
              <Stats />
            </div>
            <Schedule />
            <ZoomParallax />
            <Experience />
            <Tickets />
            <VelocityMarquee
              items={["Sexta", "Sábado", "Domingo", "Represa", "Três palcos"]}
              baseVelocity={2}
              className="py-4 font-mono text-xl text-muted uppercase"
            />
            <Faq />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
