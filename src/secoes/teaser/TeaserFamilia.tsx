import { teaser } from "@/dados";
import AbrirCadastro from "./AbrirCadastro";

export default function TeaserFamilia() {
  const { familia } = teaser;
  return (
    <section className="tz-fam">
      <img src={familia.imagem.src} alt={familia.imagem.alt} width={familia.imagem.largura} height={familia.imagem.altura} loading="lazy" decoding="async" />
      <div className="tz-wrap">
        <h2>{familia.titulo}</h2>
        <AbrirCadastro texto={familia.cta} cor="ipe" />
      </div>
    </section>
  );
}
