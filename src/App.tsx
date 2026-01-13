import { Hero } from "./components/Hero";
import { Lineup } from "./components/Lineup";
import { Navbar } from "./components/Navbar";
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
      </main>
    </>
  );
}
