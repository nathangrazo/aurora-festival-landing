import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EXPERIENCES } from "../data/festival";
import { RevealText } from "./RevealText";
import { StageArt } from "./StageArt";

const hues: Record<string, number> = { amber: 30, violet: 260, rose: 330, mint: 160 };

/**
 * Seção alta com um container sticky: o scroll vertical
 * vira movimento horizontal dos cards.
 */
export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  // Quanto a trilha precisa andar pra mostrar o último card inteiro
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 24));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experiencia" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5">
          <p className="label">Experiência</p>
          <RevealText text="Não é só show" highlight={["show"]} className="mt-3 max-w-3xl text-5xl font-bold tracking-tight sm:text-7xl" />
        </div>

        <motion.ul ref={trackRef} style={{ x }} className="mt-12 flex w-max gap-6 pl-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]">
          {EXPERIENCES.map((item, i) => (
            <li
              key={item.title}
              className="group relative flex h-[26rem] w-[19rem] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-white/10 bg-night-2 p-7 sm:h-[30rem] sm:w-[26rem]"
            >
              <div className="absolute inset-0 opacity-50 transition-[opacity,transform] duration-700 group-hover:scale-105 group-hover:opacity-90">
                <StageArt hue={hues[item.color]} crowd={false} />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-night via-night/40 to-transparent" />
              <span className="absolute top-6 left-7 font-mono text-sm text-mist/60">0{i + 1}</span>
              <div className="relative">
                <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-mist/70">{item.text}</p>
              </div>
            </li>
          ))}
        </motion.ul>

        <div className="mx-auto mt-10 w-full max-w-7xl px-5">
          <div className="h-px bg-white/10">
            <motion.div style={{ width: progress }} className="h-px bg-mint" />
          </div>
        </div>
      </div>
    </section>
  );
}
