import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
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

  // O título inclina levemente na direção do mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 80, damping: 20 });
  const tiltX = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

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
          className="label flex items-center gap-2 text-mist/80"
        >
          <span className="size-1.5 animate-pulse rounded-full bg-mint" />
          19 — 21 de março de 2027
        </motion.p>

        <motion.h1
          aria-label="Aurora"
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
          className="mt-6 flex text-[clamp(4.5rem,19vw,17rem)] leading-[0.85] font-extrabold tracking-[-0.06em] [transform-style:preserve-3d]"
        >
          {TITLE.map((letter, i) => (
            <span key={i} aria-hidden className="inline-block [perspective:800px]">
              <motion.span
                className="text-aurora inline-block origin-bottom bg-size-[600%_100%]"
                style={{ backgroundPosition: `${(i / (TITLE.length - 1)) * 100}% 0` }}
                initial={{ y: "100%", rotateX: -90, opacity: 0 }}
                animate={{ y: 0, rotateX: 0, opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </motion.h1>

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
