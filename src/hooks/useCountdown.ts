import { useEffect, useState } from "react";

export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: Date): TimeLeft {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export function useCountdown(target: Date) {
  const [left, setLeft] = useState(() => diff(target));

  useEffect(() => {
    const id = window.setInterval(() => setLeft(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return left;
}
