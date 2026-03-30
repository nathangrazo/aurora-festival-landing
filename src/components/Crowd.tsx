import { seeded } from "../lib/random";

/**
 * Silhueta de público gerada uma vez: cabeças em alturas diferentes
 * e alguns braços pra cima. Fica por cima dos "pôsteres".
 */
const rand = seeded(42);
const PEOPLE = Array.from({ length: 34 }, (_, i) => {
  const x = i * 6 + rand() * 4;
  const y = 22 + rand() * 7;
  const r = 2.6 + rand() * 1.2;
  const arm = rand() > 0.72 ? (rand() > 0.5 ? 1 : -1) : 0;
  return { x, y, r, arm };
});

const shoulders = PEOPLE.map((p) => `M${p.x - p.r * 1.9},40 Q${p.x - p.r * 1.8},${p.y + p.r * 1.3} ${p.x},${p.y + p.r * 1.2} Q${p.x + p.r * 1.8},${p.y + p.r * 1.3} ${p.x + p.r * 1.9},40 Z`).join(" ");

export function Crowd({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 204 40" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <g fill="var(--color-night)">
        <path d={shoulders} />
        {PEOPLE.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} />
        ))}
        {PEOPLE.filter((p) => p.arm).map((p, i) => (
          <path
            key={`a${i}`}
            d={`M${p.x + p.arm * p.r},${p.y + p.r * 1.4} L${p.x + p.arm * (p.r + 4)},${p.y - 9} L${p.x + p.arm * (p.r + 5.4)},${p.y - 8.4} L${p.x + p.arm * (p.r + 1.6)},${p.y + p.r * 1.6} Z`}
          />
        ))}
      </g>
    </svg>
  );
}
