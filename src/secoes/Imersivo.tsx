"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { imersivo } from "@/dados";
import { Rico } from "./Texto";

/* foto em largura total: no hover escurece, mostra o painel e a bolha segue o mouse */
export default function Imersivo({ qual }: { qual: keyof typeof imersivo }) {
  const d: { href: string; src: string; bolha: string; ref?: string; titulo: string; sub?: string; botao: string } = imersivo[qual];
  const fim = qual === "fim";
  const bolha = useRef<HTMLSpanElement>(null);

  return (
    <a
      className={`imersivo${fim ? " fim" : ""}`}
      href={d.href}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        if (!bolha.current) return;
        bolha.current.style.left = e.clientX - r.left + "px";
        bolha.current.style.top = e.clientY - r.top + "px";
      }}
    >
      <img src={d.src} alt="" loading="lazy" />
      <span className="bolha" aria-hidden="true" ref={bolha}>
        {d.bolha}
      </span>
      <span className={`painel${fim ? " sempre" : ""}`}>
        {d.ref && <span className="ref">{d.ref}</span>}
        <span className="h">
          <Rico texto={d.titulo} />
        </span>
        {d.sub && <span className="sub">{d.sub}</span>}
        <span className="bt bt-areia">
          {d.botao} <ArrowRight aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}
