"use client";

import { useState } from "react";
import { comoConstruimos } from "@/dados";
import { Rico } from "./Texto";

/* corte da rua com pinos numerados ligados à lista */
export default function ComoConstruimos() {
  const { imagem, itens } = comoConstruimos;
  const [at, setAt] = useState(0);
  const marcar = (i: number) => ({ onMouseEnter: () => setAt(i), onFocus: () => setAt(i), onClick: () => setAt(i) });

  return (
    <section className="obra">
      <div className="wrap">
        <div className="cab-sec">
          <div>
            <p className="rot">{comoConstruimos.rotulo}</p>
            <h2 className="titulo">
              <Rico texto={comoConstruimos.titulo} />
            </h2>
          </div>
          <p className="dica">{comoConstruimos.dica}</p>
        </div>
        <div className="obra-g">
          <div className="corte">
            <img src={imagem.src} alt={imagem.alt} width={imagem.largura} height={imagem.altura} />
            {itens.map((it, i) => (
              <button
                key={it.t}
                type="button"
                className="pino"
                style={{ left: it.x, top: it.y }}
                aria-label={it.t}
                aria-pressed={i === at}
                {...marcar(i)}
              >
                <i>{i + 1}</i>
              </button>
            ))}
            <span className="balao" aria-hidden="true" style={{ left: itens[at].x, top: itens[at].y }}>
              {itens[at].t}
            </span>
          </div>
          <ol>
            {itens.map((it, i) => {
              const Icone = it.icone;
              return (
                <li key={it.t}>
                  <button type="button" aria-pressed={i === at} {...marcar(i)}>
                    <b>{i + 1}</b>
                    <Icone aria-hidden="true" />
                    <span>{it.t}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
