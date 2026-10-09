"use client";

import { useEffect, useRef, useState } from "react";
import { reduz, suave } from "./util";

/* número que conta de 0 até v quando entra na tela */
export default function Contador({ v }: { v: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(v);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduz()) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const t0 = performance.now();
          const p = (t: number) => {
            const k = Math.min(1, (t - t0) / 1600);
            setN(Math.round(v * suave(k)));
            if (k < 1) raf = requestAnimationFrame(p);
          };
          raf = requestAnimationFrame(p);
        }),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [v]);

  return (
    <span className="conta" ref={ref}>
      {n.toLocaleString("pt-BR")}
    </span>
  );
}
