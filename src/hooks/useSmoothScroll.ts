import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Scroll suave com Lenis. Também intercepta os links "#ancora"
 * pra que a navegação pelo menu use a mesma curva.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const target = link.getAttribute("href")!;
      const el = target === "#" ? null : document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [enabled]);
}
