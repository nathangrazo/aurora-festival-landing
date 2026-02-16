import { Experience } from "./components/Experience";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Lineup } from "./components/Lineup";
import { Navbar } from "./components/Navbar";
import { Schedule } from "./components/Schedule";
import { Tickets } from "./components/Tickets";
import { VelocityMarquee } from "./components/VelocityMarquee";
import { ARTISTS } from "./data/festival";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <VelocityMarquee
          items={ARTISTS.map((a) => a.name)}
          className="border-y border-white/10 py-6 text-4xl font-bold tracking-tight sm:text-6xl"
        />
        <Lineup />
        <Schedule />
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
  );
}
