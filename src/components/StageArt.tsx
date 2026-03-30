import { Crowd } from "./Crowd";

/**
 * Ilustração de palco feita só com gradientes: luz de fundo,
 * feixes saindo do topo e a silhueta do público na frente.
 */
export function StageArt({ hue, crowd = true }: { hue: number; crowd?: boolean }) {
  const a = `hsl(${hue} 95% 65%`;
  const b = `hsl(${(hue + 50) % 360} 95% 70%`;

  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background: `radial-gradient(70% 45% at 50% 100%, ${a} / .9), transparent 70%),
          conic-gradient(at 50% -10%, transparent 140deg, ${b} / .6) 152deg, transparent 160deg, ${a} / .5) 172deg, transparent 178deg, ${b} / .55) 186deg, transparent 192deg, ${a} / .5) 204deg, transparent 212deg),
          radial-gradient(30% 22% at 50% 0%, ${b} / .9), transparent 70%),
          linear-gradient(180deg, hsl(${(hue + 220) % 360} 50% 8%), hsl(${hue} 55% 18%))`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(transparent_40%,rgb(7_6_11/0.5))]" />
      {crowd && <Crowd className="absolute inset-x-0 bottom-0 h-[42%] w-full" />}
    </div>
  );
}
