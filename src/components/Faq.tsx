import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { FAQ } from "../data/festival";
import { RevealText } from "./RevealText";

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <li className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-semibold sm:text-2xl"
      >
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="shrink-0 text-mint">
          <Plus className="size-6" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 text-mist/70">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Faq() {
  return (
    <section id="faq" className="mx-auto grid max-w-7xl gap-12 px-5 py-32 md:grid-cols-[1fr_2fr]">
      <div>
        <p className="label">FAQ</p>
        <RevealText text="Dúvidas" className="mt-3 text-5xl font-bold tracking-tight" />
        <p className="mt-4 text-mist/60">
          Não achou? Escreve pra <a className="text-mint underline-offset-4 hover:underline" href="mailto:oi@aurorafest.com.br">oi@aurorafest.com.br</a>
        </p>
      </div>
      <ul className="border-t border-white/10">
        {FAQ.map((item) => (
          <Item key={item.q} {...item} />
        ))}
      </ul>
    </section>
  );
}
