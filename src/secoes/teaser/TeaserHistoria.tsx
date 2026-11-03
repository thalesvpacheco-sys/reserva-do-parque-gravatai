import { teaser } from "@/dados";

export default function TeaserHistoria() {
  const { historia } = teaser;
  return (
    <section className="tz-hist">
      <div className="tz-wrap">
        <div>
          <p className="tz-rot">{historia.rotulo}</p>
          <h2>{historia.titulo}</h2>
        </div>
        <div className="tz-hist-txt">
          {historia.textos.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
