import { teaserCorretor } from "@/dados";
import Contador from "../Contador";
import { Rico } from "../Texto";

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
            {porte.textos.map((t) => (
              <p key={t}>
                <Rico texto={t} />
              </p>
            ))}
          </div>
        </div>
        <div className="tc-presenca">
          <h3>{porte.presenca}</h3>
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
      </div>
    </section>
  );
}
