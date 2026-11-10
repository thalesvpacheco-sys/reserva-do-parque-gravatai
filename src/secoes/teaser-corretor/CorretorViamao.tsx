import { teaserCorretor } from "@/dados";

export default function CorretorViamao() {
  const { viamao } = teaserCorretor;
  return (
    <section className="tc-pano">
      <img src={viamao.imagem.src} alt={viamao.imagem.alt} width={viamao.imagem.largura} height={viamao.imagem.altura} loading="lazy" decoding="async" />
      <div className="tz-wrap">
        <span className="tz-rot tz-rot-ipe">{viamao.rotulo}</span>
        <strong>{viamao.frase}</strong>
      </div>
    </section>
  );
}
