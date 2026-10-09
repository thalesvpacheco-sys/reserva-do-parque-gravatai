import { ArrowRight, MapPin } from "lucide-react";
import { localizacao } from "@/dados";
import { Rico, Valor } from "./Texto";

export default function Localizacao() {
  const { imagem } = localizacao;
  return (
    <section id="localizacao" className="lf">
      <img src={imagem.src} alt={imagem.alt} loading="lazy" />
      <span className="selo-ref">{localizacao.selo}</span>
      <div className="wrap">
        <div className="lf-card">
          <p className="rot">{localizacao.rotulo}</p>
          <h2 className="titulo">
            <Rico texto={localizacao.titulo} />
          </h2>
          <p>{localizacao.texto}</p>
          <ul>
            {localizacao.pontos.map((p, i) => (
              <li key={i}>
                <MapPin aria-hidden="true" />
                <Valor texto={p} />
              </li>
            ))}
          </ul>
          <a className="bt bt-verde" href={localizacao.cta.href}>
            {localizacao.cta.t} <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
