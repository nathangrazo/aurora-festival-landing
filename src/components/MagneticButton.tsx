import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
};

/** Botão que "puxa" na direção do cursor quando ele chega perto. */
export function MagneticButton({ href, children, variant = "solid" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  function handleMove(e: React.PointerEvent) {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const styles =
    variant === "solid"
      ? "bg-mist text-night hover:bg-mint"
      : "border border-white/20 text-mist hover:border-white/50";

  return (
    <motion.a
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-colors duration-300 ${styles}`}
    >
      {children}
    </motion.a>
  );
}
