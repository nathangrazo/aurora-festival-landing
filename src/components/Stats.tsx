import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

const STATS = [
  { value: 3, suffix: "", label: "dias de festival" },
  { value: 12, suffix: "", label: "artistas no line-up" },
  { value: 40, suffix: "mil", label: "pessoas por dia" },
  { value: 30, suffix: "", label: "cozinhas locais" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => String(Math.round(v)));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, mv, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{text}</motion.span>
      {suffix && <span className="ml-2 text-[0.4em] text-mist/60">{suffix}</span>}
    </span>
  );
}

export function Stats() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group relative overflow-hidden bg-night p-6 sm:p-10"
        >
          <div className="absolute -right-10 -bottom-10 size-40 rounded-full bg-violet/0 blur-3xl transition-colors duration-700 group-hover:bg-violet/30" />
          <p className="relative text-6xl font-extrabold tracking-tight sm:text-8xl">
            <Counter value={s.value} suffix={s.suffix} />
          </p>
          <p className="label relative mt-2">{s.label}</p>
        </motion.div>
      ))}
    </section>
  );
}
