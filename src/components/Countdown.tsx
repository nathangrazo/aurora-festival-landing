import { AnimatePresence, motion } from "motion/react";
import { FESTIVAL_DATE } from "../data/festival";
import { useCountdown } from "../hooks/useCountdown";

const units = [
  ["days", "dias"],
  ["hours", "horas"],
  ["minutes", "min"],
  ["seconds", "seg"],
] as const;

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-flex h-[1.1em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Countdown() {
  const left = useCountdown(FESTIVAL_DATE);

  return (
    <dl className="flex gap-3 sm:gap-4" aria-label="Contagem regressiva para o festival">
      {units.map(([key, label]) => {
        const value = String(left[key]).padStart(2, "0");
        return (
          <div
            key={key}
            className="flex min-w-16 flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 backdrop-blur-md sm:min-w-20"
          >
            <dd className="font-mono text-2xl tabular-nums sm:text-3xl">
              {value.split("").map((d, i) => (
                <Digit key={i} value={d} />
              ))}
            </dd>
            <dt className="label mt-1 text-[0.65rem]">{label}</dt>
          </div>
        );
      })}
    </dl>
  );
}
