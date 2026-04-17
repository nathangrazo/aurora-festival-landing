import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { StageArt } from "./StageArt";

/**
 * "Pôsteres" gerados com CSS no lugar de fotos. Cada um tem
 * uma posição em volta do central e escala numa velocidade diferente.
 */
const POSTERS = [
  { pos: "", size: "h-[25vh] w-[25vw]", scale: 4, hue: 270, caption: "Palco Aurora · 2026" },
  { pos: "-top-[30vh] left-[5vw]", size: "h-[30vh] w-[35vw]", scale: 5, hue: 330, caption: "Pôr do sol na represa" },
  { pos: "-top-[10vh] -left-[25vw]", size: "h-[45vh] w-[20vw]", scale: 6, hue: 170, caption: "Tenda Orbital" },
  { pos: "left-[27.5vw]", size: "h-[25vh] w-[25vw]", scale: 5, hue: 30, caption: "Feira de vinil" },
  { pos: "top-[27.5vh] left-[5vw]", size: "h-[25vh] w-[20vw]", scale: 6, hue: 210, caption: "Camping" },
  { pos: "top-[27.5vh] -left-[22.5vw]", size: "h-[25vh] w-[30vw]", scale: 8, hue: 300, caption: "Baile Orbital" },
  { pos: "top-[22.5vh] left-[25vw]", size: "h-[15vh] w-[15vw]", scale: 9, hue: 140, caption: "Coral Elétrico" },
];

function Poster({ hue, caption, center }: { hue: number; caption: string; center?: boolean }) {
  return (
    <div className="relative size-full overflow-hidden rounded-xl">
      <StageArt hue={hue} />
      {center ? (
        <div className="absolute inset-0 grid place-items-center p-4 text-center">
          <p className="text-[clamp(1.1rem,2.2vw,3rem)] leading-none font-extrabold tracking-tight">
            40 mil pessoas
            <span className="block font-mono text-[clamp(0.5rem,0.7vw,1rem)] font-normal tracking-widest text-mist/70 uppercase">edição 2026</span>
          </p>
        </div>
      ) : (
        <p className="absolute bottom-2 left-3 font-mono text-[0.55vw] tracking-wider text-mist/80 uppercase">{caption}</p>
      )}
    </div>
  );
}

function Tile({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const p = POSTERS[index];
  const scale = useTransform(progress, [0, 1], [1, p.scale]);

  return (
    <motion.div style={{ scale }} className="absolute inset-0 flex items-center justify-center">
      <div className={`relative ${p.pos} ${p.size}`}>
        <Poster hue={p.hue} caption={p.caption} center={index === 0} />
      </div>
    </motion.div>
  );
}

export function ZoomParallax() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} className="relative h-[300vh]" aria-label="Como foi a edição de 2026">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.p style={{ opacity: titleOpacity }} className="label absolute bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-night/70 px-4 py-2 backdrop-blur">
          Edição 2026 · role pra entrar
        </motion.p>
        {POSTERS.map((_, i) => (
          <Tile key={i} progress={scrollYProgress} index={i} />
        ))}
      </div>
    </section>
  );
}
