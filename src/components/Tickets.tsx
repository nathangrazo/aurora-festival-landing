import { motion } from "motion/react";
import { Check } from "lucide-react";
import { TICKETS } from "../data/festival";
import { RevealText } from "./RevealText";
import { TiltCard } from "./TiltCard";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function Tickets() {
  return (
    <section id="ingressos" className="relative mx-auto max-w-7xl px-5 py-32">
      <div className="text-center">
        <p className="label">Ingressos · 2º lote</p>
        <RevealText text="Escolha seu passe" highlight={["passe"]} className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl" />
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3 md:items-center">
        {TICKETS.map((ticket, i) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard
              className={`rounded-3xl p-8 ${
                ticket.featured
                  ? "bg-linear-to-br from-violet via-rose to-amber text-night md:py-12"
                  : "border border-white/10 bg-night-2"
              }`}
            >
              <div style={{ transform: "translateZ(40px)" }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{ticket.name}</h3>
                  {ticket.featured && (
                    <span className="rounded-full bg-night px-3 py-1 font-mono text-[0.65rem] tracking-widest text-mist uppercase">
                      Mais vendido
                    </span>
                  )}
                </div>

                <p className="mt-6 text-6xl font-extrabold tracking-tight">
                  {brl.format(ticket.price)}
                </p>
                <p className={`mt-1 text-sm ${ticket.featured ? "text-night/70" : "text-muted"}`}>+ taxa de serviço</p>

                <ul className="mt-8 space-y-3">
                  {ticket.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-sm">
                      <Check className={`size-4 shrink-0 ${ticket.featured ? "" : "text-mint"}`} />
                      {perk}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`mt-10 w-full rounded-full py-4 text-sm font-semibold transition-transform active:scale-95 ${
                    ticket.featured ? "bg-night text-mist" : "bg-mist text-night hover:bg-mint"
                  }`}
                >
                  Comprar
                </button>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
