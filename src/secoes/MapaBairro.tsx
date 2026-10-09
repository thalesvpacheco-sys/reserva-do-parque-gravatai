"use client";

import { useState } from "react";
import { mapa } from "@/dados";
import { pad } from "./util";

/* implantação com pinos ligados à legenda */
export default function MapaBairro() {
  const { imagem, pontos } = mapa;
  const [at, setAt] = useState(0);
  const marcar = (i: number) => ({ onMouseEnter: () => setAt(i), onFocus: () => setAt(i), onClick: () => setAt(i) });

  return (
    <section id="mapa" className="wrap mapa-sec">
      <div className="cab-sec">
        <p className="rot">{mapa.rotulo}</p>
        <p className="dica">{mapa.dica}</p>
      </div>
      <div className="mapa-g">
        <div className="mapa">
          <img src={imagem.src} alt={imagem.alt} width={imagem.largura} height={imagem.altura} loading="lazy" />
          {pontos.map((p, i) => (
            <button
              key={p.t}
              type="button"
              className="pino"
              style={{ left: p.x, top: p.y }}
              aria-label={p.t}
              aria-pressed={i === at}
              {...marcar(i)}
            >
              <i>{i + 1}</i>
            </button>
          ))}
        </div>
        <ol className="legenda">
          {pontos.map((p, i) => (
            <li key={p.t}>
              <button type="button" aria-pressed={i === at} {...marcar(i)}>
                <span>{pad(i + 1)}</span>
                <span>
                  <strong>{p.t}</strong>
                  <small>{p.d}</small>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
