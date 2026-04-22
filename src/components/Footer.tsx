import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AuroraBackground } from "./AuroraBackground";
import { MagneticButton } from "./MagneticButton";
import { RevealText } from "./RevealText";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.1em", "-0.06em"]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/10">
      <div className="relative flex min-h-[80svh] flex-col items-center justify-center px-5 py-32 text-center">
        <div className="absolute inset-0 opacity-70">
          <AuroraBackground />
        </div>
        <p className="label relative text-mist/80">19 — 21.03.2027</p>
        <RevealText
          text="Te vejo na represa."
          highlight={["represa."]}
          className="relative mt-4 max-w-4xl text-6xl leading-[0.95] font-extrabold tracking-tight sm:text-8xl"
        />
        <div className="relative mt-10">
          <MagneticButton href="#ingressos">Garantir meu passe</MagneticButton>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-8 px-5 pt-16 text-sm text-mist/60">
        <p>
          Represa Guarapiranga · São Paulo
          <br />
          19, 20 e 21 de março de 2027
        </p>
        <ul className="flex gap-6">
          <li><a className="hover:text-mist" href="#">Instagram</a></li>
          <li><a className="hover:text-mist" href="#">Spotify</a></li>
          <li><a className="hover:text-mist" href="#">Imprensa</a></li>
        </ul>
        <p className="w-full font-mono text-xs text-muted">
          Projeto fictício feito para portfólio. Artistas, preços e datas são inventados.
        </p>
      </div>

      <motion.p
        aria-hidden
        style={{ y, letterSpacing }}
        className="text-aurora mt-10 pb-[3vw] text-center text-[24vw] leading-[0.85] font-extrabold select-none"
      >
        AURORA
      </motion.p>
    </footer>
  );
}
