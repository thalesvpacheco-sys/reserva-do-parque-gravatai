"use client";

import { useEffect, useRef, useState } from "react";
import { teaser } from "@/dados";
import { clamp, reduz } from "../util";

/*
 * Mapa do Brasil que "desce" até Viamão conforme a rolagem: o trilho é alto e o palco fica
 * fixo (sticky). A posição no trilho (0 a 1) vira as variáveis do palco:
 *   --zs  escala do mapa      --zo  entrada da foto aérea e do pino
 *   --zp  troca para a foto do pôr do sol e entrada do texto
 * Com movimento reduzido, o palco já nasce no fim (ver teaser.css) e nada é calculado.
 */
export default function TeaserZoom() {
  const { zoom } = teaser;
  const trilho = useRef<HTMLElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const [etapa, setEtapa] = useState(0);

  useEffect(() => {
    const t = trilho.current;
    const p = palco.current;
    if (!t || !p || reduz()) return;
    let raf = 0;
    const atualizar = () => {
      const r = t.getBoundingClientRect();
      const k = clamp(-r.top / (r.height - p.offsetHeight));
      const ez = Math.pow(Math.min(k / 0.7, 1), 3);
      p.style.setProperty("--zs", String(1 + ez * 7));
      p.style.setProperty("--zo", String(clamp((k - 0.55) / 0.3)));
      p.style.setProperty("--zp", String(clamp((k - 0.86) / 0.12)));
      setEtapa(k < 0.3 ? 0 : k < 0.62 ? 1 : 2);
    };
    const ao = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(atualizar);
    };
    atualizar();
    addEventListener("scroll", ao, { passive: true });
    addEventListener("resize", ao);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", ao);
      removeEventListener("resize", ao);
    };
  }, []);

  return (
    <section className="tz-zoom" ref={trilho}>
      <div className="tz-palco" ref={palco}>
        <div className={`tz-etapa${etapa === 2 ? " claro" : ""}`} aria-hidden="true">
          {zoom.etapas.map((e, i) => (
            <span key={e} className={i === etapa ? "on" : undefined}>
              {e}
            </span>
          ))}
        </div>
        <div className="tz-mapa">
          <img src={zoom.mapa.src} alt={zoom.mapa.alt} width={zoom.mapa.largura} height={zoom.mapa.altura} />
          <div className="tz-pulso">
            <span>{zoom.mapa.pino}</span>
          </div>
        </div>
        <img className="tz-foto" src={zoom.aerea.src} alt={zoom.aerea.alt} width={zoom.aerea.largura} height={zoom.aerea.altura} loading="lazy" decoding="async" />
        <span className="tz-pino" aria-hidden="true"></span>
        <img className="tz-foto2" src={zoom.porDoSol.src} alt={zoom.porDoSol.alt} width={zoom.porDoSol.largura} height={zoom.porDoSol.altura} loading="lazy" decoding="async" />
        <div className="tz-txt">
          <span className="tz-rot tz-rot-ipe">{zoom.rotulo}</span>
          <strong>{zoom.frase}</strong>
        </div>
      </div>
    </section>
  );
}
