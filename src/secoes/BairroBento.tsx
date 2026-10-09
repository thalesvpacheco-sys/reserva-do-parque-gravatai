import { ArrowRight, MapPin } from "lucide-react";
import { bairro } from "@/dados";
import Contador from "./Contador";
import { Rico, Valor } from "./Texto";

export default function BairroBento() {
  const [f1, f2, f3] = bairro.fotos;
  const { infraestrutura, lazer, lotes } = bairro.numeros;

  return (
    <section id="bairro" className="bento">
      <div className="wrap bento-g">
        <div className="bt-frase">
          <p className="rot">{bairro.rotulo}</p>
          <h2>
            <Rico texto={bairro.frase} />
          </h2>
        </div>
        <figure className="bt-f bt-f1">
          <img src={f1.src} alt={f1.alt} loading="lazy" />
          <figcaption>{f1.legenda}</figcaption>
        </figure>
        <div className="bt-n bt-ipe">
          <strong>
            <Contador v={infraestrutura.v} />
          </strong>
          <span>{infraestrutura.t}</span>
        </div>
        <div className="bt-n bt-areia">
          <strong>
            <Contador v={lazer.v} />
          </strong>
          <span>{lazer.t}</span>
        </div>
        <figure className="bt-f bt-f2">
          <img src={f2.src} alt={f2.alt} loading="lazy" />
          <figcaption>{f2.legenda}</figcaption>
        </figure>
        <div className="bt-apoio">
          <p>{bairro.apoio}</p>
          <a className="bt bt-verde" href={bairro.cta.href}>
            {bairro.cta.t} <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="bt-n bt-linha">
          <strong>{typeof lotes.v === "number" ? <Contador v={lotes.v} /> : <Valor texto={lotes.v} />}</strong>
          <span>{lotes.t}</span>
        </div>
        <figure className="bt-f bt-f3">
          <img src={f3.src} alt={f3.alt} loading="lazy" />
          <figcaption>
            <MapPin aria-hidden="true" /> {f3.legenda}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
