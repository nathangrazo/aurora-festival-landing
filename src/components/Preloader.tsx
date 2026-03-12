import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

const LETTERS = "AURORA".split("");

/** Tela de entrada: contador de 0 a 100 e depois a cortina abre. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const bar = useTransform(progress, (v) => `${v}%`);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const controls = animate(progress, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onComplete: onDone,
    });
    return () => {
      controls.stop();
      document.body.style.overflow = "";
    };
  }, [progress, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-night p-6 sm:p-10"
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex justify-between">
        <span className="label">Aurora Festival</span>
        <span className="label">Edição 2027</span>
      </div>

      <div className="flex justify-center overflow-hidden">
        {LETTERS.map((l, i) => (
          <motion.span
            key={i}
            className="text-aurora inline-block bg-size-[600%_100%] text-[18vw] leading-none font-extrabold tracking-[-0.06em] sm:text-[12vw]"
            style={{ backgroundPosition: `${(i / (LETTERS.length - 1)) * 100}% 0` }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "-110%" }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      <div>
        <div className="flex items-end justify-between">
          <span className="label">Carregando line-up</span>
          <motion.span className="font-mono text-5xl tabular-nums sm:text-7xl">{counter}</motion.span>
        </div>
        <div className="mt-4 h-px bg-white/10">
          <motion.div className="h-px bg-linear-to-r from-mint via-violet to-rose" style={{ width: bar }} />
        </div>
      </div>
    </motion.div>
  );
}
