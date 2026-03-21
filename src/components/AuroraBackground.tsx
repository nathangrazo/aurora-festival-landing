import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect } from "react";
import { seeded } from "../lib/random";

const rand = seeded(7);
const STARS = Array.from({ length: 70 }, () => ({
  top: rand() * 100,
  left: rand() * 100,
  size: rand() * 2 + 0.5,
  delay: rand() * 4,
  duration: 2 + rand() * 3,
}));

const blobs = [
  { color: "var(--color-violet)", size: "max(55vw, 420px)", x: ["-10%", "15%", "-5%"], y: ["-20%", "5%", "-10%"], duration: 18 },
  { color: "var(--color-mint)", size: "max(45vw, 340px)", x: ["40%", "20%", "45%"], y: ["-10%", "10%", "0%"], duration: 22 },
  { color: "var(--color-rose)", size: "max(40vw, 300px)", x: ["60%", "75%", "55%"], y: ["20%", "0%", "25%"], duration: 20 },
];

export function AuroraBackground() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgb(255 255 255 / 0.08), transparent 70%)`;

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen blur-[110px]"
          style={{ width: b.size, height: b.size, background: b.color }}
          initial={{ x: b.x[0], y: b.y[0], scale: 0.6, opacity: 0 }}
          animate={
            reduce
              ? { opacity: 0.35, scale: 1 }
              : { x: b.x, y: b.y, scale: [1, 1.15, 1], opacity: 0.35 }
          }
          transition={{
            duration: b.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            opacity: { duration: 2, repeat: 0 },
          }}
        />
      ))}

      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* Estrelas piscando */}
      {STARS.map((star, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ top: `${star.top}%`, left: `${star.left}%`, width: star.size, height: star.size }}
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.5 } : { opacity: [0, 0.9, 0.2, 0.9] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, repeatType: "mirror" }}
        />
      ))}

      {/* Linhas de horizonte */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_bottom,transparent,var(--color-night)_85%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-size-[80px_100%] mask-[linear-gradient(to_bottom,transparent,black_40%,transparent)]" />
    </div>
  );
}
