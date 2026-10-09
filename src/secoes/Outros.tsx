import { ArrowUpRight } from "lucide-react";
import { outros } from "@/dados";
import { Rico } from "./Texto";

export default function Outros() {
  return (
    <section className="outros">
      <div className="wrap">
        <div className="topo-sec">
          <div>
            <p className="rot">{outros.rotulo}</p>
            <h2 className="titulo">
              <Rico texto={outros.titulo} />
            </h2>
          </div>
          <p>{outros.texto}</p>
        </div>
        <div className="outros-grade">
          {outros.itens.map((o) => (
            <a key={o.nome} className="oug" href={o.href} target="_blank" rel="noopener">
              <span className="im">
                <img src={o.src} alt="" loading="lazy" />
                {o.provisoria && <em>{outros.provisoria}</em>}
              </span>
              <span className="info">
                <small>{o.local}</small>
                <strong>{o.nome}</strong>
                <p>{o.d}</p>
                <span className="ir" aria-hidden="true">
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
