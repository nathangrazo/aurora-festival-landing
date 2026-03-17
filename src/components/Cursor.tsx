import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cursor customizado: um ponto que segue o mouse na hora e um anel
 * que vem atrás com mola. O anel cresce em links e botões.
 * Só aparece em dispositivos com mouse.
 */
export function Cursor() {
  const [enabled] = useState(
    () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovering(Boolean((e.target as HTMLElement).closest("a, button, [data-cursor]")));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[95] size-1.5 rounded-full bg-mist mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[95] rounded-full border border-mist mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 64 : 32,
          height: hovering ? 64 : 32,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "rgb(236 233 245 / 1)" : "rgb(236 233 245 / 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
