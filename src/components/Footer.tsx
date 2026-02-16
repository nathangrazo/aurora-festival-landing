import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.1em", "-0.06em"]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/10 pt-20">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-8 px-5 text-sm text-mist/60">
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
