import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, MapPin } from "lucide-react";
import { useRef } from "react";
import { AuroraBackground } from "./AuroraBackground";
import { Countdown } from "./Countdown";
import { MagneticButton } from "./MagneticButton";

const TITLE = "AURORA".split("");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(12px)"]);

  return (
    <section ref={ref} id="topo" className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16">
      <AuroraBackground />

      <motion.div
        style={reduce ? undefined : { scale, opacity, filter: blur }}
        className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-5 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="label flex items-center gap-2"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-mint" />
          19 — 21 de março de 2027
        </motion.p>

        <h1 aria-label="Aurora" className="mt-6 flex overflow-hidden text-[clamp(4.5rem,19vw,17rem)] leading-[0.85] font-extrabold tracking-[-0.06em]">
          {TITLE.map((letter, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="text-aurora inline-block bg-size-[600%_100%]"
              style={{ backgroundPosition: `${(i / (TITLE.length - 1)) * 100}% 0` }}
              initial={{ y: "105%", rotate: 8 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-col items-center gap-8"
        >
          <p className="max-w-xl text-lg text-balance text-mist/80 sm:text-xl">
            Três dias de música, cinema e comida boa à beira da represa. Doze artistas, três palcos e um pôr do sol por dia.
          </p>

          <Countdown />

          <div className="flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="#ingressos">Garantir ingresso</MagneticButton>
            <MagneticButton href="#lineup" variant="ghost">
              Ver line-up
            </MagneticButton>
          </div>

          <p className="label flex items-center gap-1.5">
            <MapPin className="size-3.5" /> Represa Guarapiranga · São Paulo
          </p>
        </motion.div>
      </motion.div>

      <motion.a
        href="#lineup"
        aria-label="Rolar para o line-up"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  );
}
