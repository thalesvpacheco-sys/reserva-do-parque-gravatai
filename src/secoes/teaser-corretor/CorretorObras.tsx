import { teaserCorretor } from "@/dados";

export default function CorretorObras() {
  const { obras } = teaserCorretor;
  return (
    <section className="tc-obras">
      <div className="tz-wrap">
        <div>
          <p className="tz-rot">{obras.rotulo}</p>
          <h2>{obras.titulo}</h2>
        </div>
        <div className="tc-mosaico">
          {obras.itens.map((o) => (
            <figure key={o.src}>
              <img src={o.src} alt={o.alt} width={o.largura} height={o.altura} loading="lazy" decoding="async" style={"posicao" in o ? { objectPosition: o.posicao } : undefined} />
              <figcaption>
                {o.nome}
                <span>{o.local}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
