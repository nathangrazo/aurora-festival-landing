import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { DAYS, SCHEDULE, type DayId } from "../data/festival";

export function Schedule() {
  const [day, setDay] = useState<DayId>("sex");

  return (
    <section id="programacao" className="mx-auto max-w-7xl px-5 py-32">
      <p className="label">Programação</p>
      <h2 className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl">Dia a dia</h2>

      <div role="tablist" aria-label="Dias do festival" className="mt-12 inline-flex rounded-full border border-white/10 p-1">
        {DAYS.map((d) => (
          <button
            key={d.id}
            role="tab"
            type="button"
            aria-selected={day === d.id}
            aria-controls="painel-programacao"
            onClick={() => setDay(d.id)}
            className="relative rounded-full px-5 py-2.5 text-sm font-medium sm:px-7"
          >
            {day === d.id && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-mist"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className={`relative transition-colors ${day === d.id ? "text-night" : "text-mist/70"}`}>
              {d.label} <span className="hidden font-mono text-xs opacity-60 sm:inline">{d.date}</span>
            </span>
          </button>
        ))}
      </div>

      <div id="painel-programacao" role="tabpanel" className="mt-10 min-h-[22rem]">
        <AnimatePresence mode="wait">
          <motion.ol
            key={day}
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              show: { transition: { staggerChildren: 0.07 } },
              exit: { opacity: 0, transition: { duration: 0.15 } },
            }}
            className="grid gap-3"
          >
            {SCHEDULE[day].map((slot) => (
              <motion.li
                key={slot.artist}
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  show: { opacity: 1, x: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.6 } },
                }}
                className="grid grid-cols-[5rem_1fr] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5 transition-colors hover:border-white/25 hover:bg-white/[0.05] sm:grid-cols-[7rem_1fr_auto]"
              >
                <time className="font-mono text-2xl text-mint">{slot.time}</time>
                <span className="text-2xl font-semibold sm:text-3xl">{slot.artist}</span>
                <span className="label col-start-2 sm:col-start-auto">{slot.stage}</span>
              </motion.li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </section>
  );
}
