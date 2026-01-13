import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";
import { wrap } from "../lib/wrap";

type Props = {
  items: string[];
  baseVelocity?: number;
  className?: string;
};

/**
 * Faixa infinita que acelera conforme a velocidade do scroll
 * e inverte o sentido quando o usuário rola pra cima.
 */
export function VelocityMarquee({ items, baseVelocity = -2, className = "" }: Props) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  const row = items.map((item) => (
    <span key={item} className="flex items-center gap-8 pr-8">
      {item}
      <span className="text-[0.5em] text-mint">✦</span>
    </span>
  ));

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`} aria-hidden>
      <motion.div className="flex" style={{ x }}>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
