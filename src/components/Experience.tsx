import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EXPERIENCES } from "../data/festival";

const gradients: Record<string, string> = {
  amber: "from-amber/80 via-rose/40 to-transparent",
  violet: "from-violet/80 via-violet/20 to-transparent",
  rose: "from-rose/80 via-violet/30 to-transparent",
  mint: "from-mint/70 via-mint/10 to-transparent",
};

/**
 * Seção alta com um container sticky: o scroll vertical
 * vira movimento horizontal dos cards.
 */
export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-62%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experiencia" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5">
          <p className="label">Experiência</p>
          <h2 className="mt-3 max-w-3xl text-5xl font-bold tracking-tight sm:text-7xl">
            Não é só <span className="text-aurora">show</span>
          </h2>
        </div>

        <motion.ul style={{ x }} className="mt-12 flex w-max gap-6 pl-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]">
          {EXPERIENCES.map((item, i) => (
            <li
              key={item.title}
              className="group relative flex h-[26rem] w-[19rem] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-night-2 p-7 sm:h-[30rem] sm:w-[26rem]"
            >
              <div
                className={`absolute inset-0 bg-linear-to-b opacity-60 transition-opacity duration-700 group-hover:opacity-100 ${gradients[item.color]}`}
              />
              <span className="absolute top-6 left-7 font-mono text-sm text-mist/60">0{i + 1}</span>
              <div className="relative">
                <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-mist/70">{item.text}</p>
              </div>
            </li>
          ))}
        </motion.ul>

        <div className="mx-auto mt-10 h-px w-full max-w-7xl bg-white/10 px-5">
          <motion.div style={{ width: progress }} className="h-px bg-mint" />
        </div>
      </div>
    </section>
  );
}
