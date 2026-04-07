import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { ARTISTS, DAYS, type Artist } from "../data/festival";
import { RevealText } from "./RevealText";
import { StageArt } from "./StageArt";

const dayLabel = Object.fromEntries(DAYS.map((d) => [d.id, `${d.label} ${d.date}`]));

export function Lineup() {
  const [active, setActive] = useState<Artist | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 25 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 25 });

  function handleMove(e: React.PointerEvent) {
    x.set(e.clientX);
    y.set(e.clientY);
  }

  return (
    <section id="lineup" className="relative mx-auto max-w-7xl px-5 py-32" onPointerMove={handleMove}>
      <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label">Line-up 2027</p>
          <RevealText text="Quem sobe ao palco" highlight={["sobe"]} className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl" />
        </div>
        <p className="max-w-xs text-mist/60">Passe o mouse nos nomes. Os headliners estão marcados com ✦.</p>
      </div>

      <ul onPointerLeave={() => setActive(null)}>
        {ARTISTS.map((artist, i) => (
          <motion.li
            key={artist.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            onPointerEnter={() => setActive(artist)}
            className="group border-t border-white/10 last:border-b"
          >
            <div className="flex items-baseline justify-between gap-4 py-5 sm:py-6">
              <span
                className={`flex items-center gap-3 font-bold tracking-tight transition-all duration-500 group-hover:translate-x-4 group-hover:text-mint ${
                  artist.headliner ? "text-4xl sm:text-7xl" : "text-3xl text-mist/80 sm:text-5xl"
                }`}
              >
                <span
                  className="size-2.5 shrink-0 rounded-full md:hidden"
                  style={{ background: `hsl(${artist.hue} 90% 65%)` }}
                />
                {artist.name}
                {artist.headliner && <span className="text-[0.4em] text-rose">✦</span>}
              </span>
              <span className="label hidden shrink-0 text-right sm:block">
                {artist.genre}
                <br />
                {dayLabel[artist.day]}
              </span>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Preview que segue o cursor (só em telas com mouse) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-30 hidden [@media(hover:hover)]:block"
        style={{ x, y }}
      >
        <AnimatePresence>
          {active && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 4 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl shadow-black/60"
            >
              <motion.div key={active.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-72 w-56">
                <StageArt hue={active.hue} />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="label text-mist/80">{active.genre}</p>
                  <p className="font-bold">{active.name}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
