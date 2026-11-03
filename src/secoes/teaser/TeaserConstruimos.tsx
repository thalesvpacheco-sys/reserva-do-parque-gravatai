import { teaser } from "@/dados";
import { Rico } from "../Texto";

export default function TeaserConstruimos() {
  const { construimos } = teaser;
  const { imagem } = construimos;
  return (
    <section className="tz-cons" id={construimos.id}>
      <div className="tz-wrap">
        <p className="tz-rot tz-rot-ipe">{construimos.rotulo}</p>
        <h2>
          <Rico texto={construimos.titulo} />
        </h2>
        <img src={imagem.src} alt={imagem.alt} width={imagem.largura} height={imagem.altura} loading="lazy" decoding="async" />
      </div>
    </section>
  );
}
