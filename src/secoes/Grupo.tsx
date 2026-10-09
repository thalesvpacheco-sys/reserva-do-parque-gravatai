import { grupo } from "@/dados";
import Contador from "./Contador";
import { Rico } from "./Texto";

function Setores() {
  return grupo.setores.map((s) =>
    s.src ? (
      <div key={s.t} className="setor foto">
        <img src={s.src} alt="" loading="lazy" />
        <em>{s.t}</em>
      </div>
    ) : (
      <div key={s.t} className="setor">
        <strong>{s.t}</strong>
      </div>
    ),
  );
}

export default function Grupo() {
  const [nh, sfa] = grupo.logos;
  return (
    <section className="grupo">
      <img className="tracado" src={grupo.tracado} alt="" aria-hidden="true" />
      <div className="wrap grupo-g">
        <div>
          <div className="logos">
            <img src={nh.src} alt={nh.alt} />
            <span aria-hidden="true"></span>
            <img src={sfa.src} alt={sfa.alt} />
          </div>
          <p className="rot">{grupo.rotulo}</p>
          <h2 className="titulo">
            <Rico texto={grupo.titulo} />
          </h2>
        </div>
        <div className="grupo-txt">
          {grupo.textos.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <dl className="numeros">
            {grupo.numeros.map((n) => (
              <div key={n.nome}>
                <dd>
                  <Contador v={n.v} />
                  <small>{grupo.unidade}</small>
                </dd>
                <dt>
                  {n.nome}
                  <span>{n.local}</span>
                </dt>
              </div>
            ))}
          </dl>
          <p className="fonte">{grupo.fonte}</p>
        </div>
      </div>
      {/* faixa em loop: a segunda cópia completa a emenda */}
      <div className="setores" aria-label={grupo.setoresRotulo}>
        <div>
          <Setores />
          <div style={{ display: "contents" }} aria-hidden="true">
            <Setores />
          </div>
        </div>
      </div>
    </section>
  );
}
