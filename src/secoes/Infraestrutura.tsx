"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { infraestrutura } from "@/dados";
import { Rico } from "./Texto";

/* grade com filtro por grupo e prévia com foto que segue o mouse */
export default function Infraestrutura() {
  const { grupos, itens } = infraestrutura;
  const [filtro, setFiltro] = useState("todos");
  const [aberto, setAberto] = useState<Record<number, boolean>>({});
  const [previa, setPrevia] = useState<{ on: boolean; src?: string; d?: string }>({ on: false });
  const pv = useRef<HTMLDivElement>(null);

  const nomeGrupo = (g: string) => grupos.find((x) => x.g === g)?.t;
  const conta = (g: string) => (g === "todos" ? itens.length : itens.filter((i) => i.g === g).length);

  return (
    <section id="infraestrutura" className="gps">
      <div className="wrap">
        <div className="topo-sec">
          <div>
            <p className="rot">{infraestrutura.rotulo}</p>
            <h2 className="titulo">
              <Rico texto={infraestrutura.titulo} />
            </h2>
          </div>
          <div className="gp-chips">
            {grupos.map((g) => (
              <button key={g.g} type="button" aria-pressed={filtro === g.g} onClick={() => setFiltro(g.g)}>
                {g.t} <small>{conta(g.g)}</small>
              </button>
            ))}
          </div>
        </div>
        <ul className="gp-grade">
          {itens.map((it, i) => {
            const Icone = it.icone;
            return (
              <li key={it.t} className={filtro !== "todos" && it.g !== filtro ? "apaga" : undefined}>
                <button
                  type="button"
                  className="gp"
                  aria-expanded={aberto[i]}
                  onMouseEnter={() => setPrevia({ on: true, src: infraestrutura.imagem800(it.im), d: it.d })}
                  onMouseLeave={() => setPrevia((p) => ({ ...p, on: false }))}
                  onMouseMove={(e) => {
                    pv.current?.style.setProperty("--x", Math.min(e.clientX + 20, innerWidth - 300) + "px");
                    pv.current?.style.setProperty("--y", Math.min(e.clientY + 20, innerHeight - 260) + "px");
                  }}
                  onClick={() => setAberto((a) => ({ ...a, [i]: !a[i] }))}
                >
                  <Icone aria-hidden="true" />
                  <span>{it.t}</span>
                  <small>{nomeGrupo(it.g)}</small>
                  <span className="gp-inline">
                    <img src={infraestrutura.imagem800(it.im)} alt="" loading="lazy" />
                    <em>{it.d}</em>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <a className="bt bt-verde" href={infraestrutura.cta.href}>
          {infraestrutura.cta.t} <ArrowRight aria-hidden="true" />
        </a>
      </div>
      <div className={`gp-previa${previa.on ? " on" : ""}`} aria-hidden="true" ref={pv}>
        <img alt="" src={previa.src} />
        <p>{previa.d}</p>
      </div>
    </section>
  );
}
