import { teaser } from "@/dados";
import Contador from "../Contador";
import AbrirCadastro from "./AbrirCadastro";

export default function TeaserSolidez() {
  const { solidez, confirmar } = teaser;
  const { texto1 } = solidez;
  return (
    <section className="tz-sol">
      <div className="tz-wrap">
        <div className="tz-sol-cab">
          <h2>{solidez.titulo}</h2>
          <div className="tz-sol-txt">
            <p>
              {texto1.antes}
              <span className="tz-pend" title={confirmar.estados}>
                {texto1.estados}
              </span>
              {texto1.depois}
            </p>
            <p>{solidez.texto2}</p>
            <AbrirCadastro texto={solidez.cta} cor="verde" />
          </div>
        </div>
        <div className="tz-nums">
          {solidez.numeros.map((n) => (
            <div key={n.rotulo}>
              <strong className={n.confirmar ? "tz-pend" : undefined} title={n.confirmar ? confirmar.estados : undefined}>
                <Contador v={n.v} />
              </strong>
              <span>{n.rotulo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
