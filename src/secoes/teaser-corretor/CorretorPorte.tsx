import { teaserCorretor } from "@/dados";
import Contador from "../Contador";
import { Rico } from "../Texto";
import AbrirCadastro from "../teaser/AbrirCadastro";

export default function CorretorPorte() {
  const { porte } = teaserCorretor;
  return (
    <section className="tc-porte">
      <div className="tz-wrap">
        <div className="tc-porte-cab">
          <h2>
            <Rico texto={porte.titulo} />
          </h2>
          <div className="tc-porte-txt">
            <p>{porte.texto}</p>
            <p className="tc-destaque">{porte.destaque}</p>
            <AbrirCadastro texto={porte.cta} cor="verde" />
          </div>
        </div>
        <div className="tc-nums">
          {porte.numeros.map((n) => (
            <div key={n.rotulo}>
              <strong>
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
