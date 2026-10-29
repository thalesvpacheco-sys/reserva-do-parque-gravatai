"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { teaser } from "@/dados";
import { reduz } from "../util";

/* carrossel por rolagem horizontal com snap; as setas andam uma foto e desligam nas pontas */
export default function TeaserObras() {
  const { obras } = teaser;
  const fila = useRef<HTMLDivElement>(null);
  const [pode, setPode] = useState({ ant: false, prox: true });

  const medir = () => {
    const el = fila.current;
    if (!el) return;
    const ant = el.scrollLeft > 4;
    const prox = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setPode((p) => (p.ant === ant && p.prox === prox ? p : { ant, prox }));
  };

  useEffect(() => {
    medir();
    addEventListener("resize", medir);
    return () => removeEventListener("resize", medir);
  }, []);

  const passo = (d: number) => {
    const el = fila.current;
    const f = el?.firstElementChild;
    if (!el || !f) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: d * (f.getBoundingClientRect().width + gap), behavior: reduz() ? "auto" : "smooth" });
  };

  return (
    <section className="tz-obras">
      <div className="tz-wrap tz-obras-cab">
        <div>
          <p className="tz-rot tz-rot-ipe">{obras.rotulo}</p>
          <h2>{obras.titulo}</h2>
        </div>
        <div className="tz-setas">
          <button type="button" aria-label={obras.ant} disabled={!pode.ant} onClick={() => passo(-1)}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" aria-label={obras.prox} disabled={!pode.prox} onClick={() => passo(1)}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="tz-fila" ref={fila} tabIndex={0} role="group" aria-label={obras.rotuloLista} onScroll={medir}>
        {obras.itens.map((o, i) => (
          <figure key={o.src}>
            <div className="tz-img">
              <img src={o.src} alt={o.alt} width={o.largura} height={o.altura} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
            </div>
            <figcaption>
              <b>{o.nome}</b>
              <span>{o.local}</span>
            </figcaption>
          </figure>
        ))}
        <figure className="tz-breve">
          <div className="tz-img">
            <span className="tz-rot tz-rot-escuro">{obras.breve.rotulo}</span>
            <strong>{obras.breve.titulo}</strong>
          </div>
        </figure>
      </div>
    </section>
  );
}
