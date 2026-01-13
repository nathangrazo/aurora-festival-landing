import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#lineup", label: "Line-up" },
  { href: "#programacao", label: "Programação" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#ingressos", label: "Ingressos" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Esconde ao rolar pra baixo e volta ao rolar pra cima
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 200);
    setScrolled(current > 40);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-110%" : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-colors duration-500 ${
            scrolled ? "border border-white/10 bg-night/70 backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <a href="#topo" className="text-lg font-bold tracking-tight">
            aurora<span className="text-mint">*</span>
          </a>

          <ul className="hidden items-center gap-8 text-sm text-mist/70 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-mist">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#ingressos"
            className="hidden rounded-full bg-mist px-4 py-2 text-sm font-semibold text-night transition-colors hover:bg-mint md:inline-block"
          >
            Ingressos
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="relative z-10 md:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(150% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-night-2 px-6 md:hidden"
          >
            <ul className="space-y-2">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                >
                  <a href={link.href} onClick={() => setOpen(false)} className="text-5xl font-bold tracking-tight">
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
