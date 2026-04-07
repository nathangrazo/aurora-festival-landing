import { motion, useInView } from "motion/react";
import { useRef, type ElementType } from "react";

type Props = {
  text: string;
  /** Palavras que recebem o gradiente da marca */
  highlight?: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
};

/**
 * Título que sobe palavra por palavra quando entra na tela.
 *
 * A detecção fica no elemento pai: cada palavra começa escondida
 * pelo overflow, então um IntersectionObserver nela nunca dispararia.
 */
export function RevealText({ text, highlight = [], as: Tag = "h2", className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span
            className={`inline-block ${highlight.includes(word) ? "text-aurora" : ""}`}
            initial={{ y: "110%", rotate: 6 }}
            animate={inView ? { y: 0, rotate: 0 } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
