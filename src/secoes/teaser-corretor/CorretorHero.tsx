import { teaserCorretor } from "@/dados";
import { Rico } from "../Texto";
import AbrirCadastro from "../teaser/AbrirCadastro";

export default function CorretorHero() {
  const { hero, logo } = teaserCorretor;
  return (
    <section className="tc-hero">
      <div className="tc-hero-txt">
        <img src={logo.src} alt={logo.alt} width={logo.largura} height={logo.altura} />
        <span className="tz-rot">{hero.rotulo}</span>
        <h1>
          <Rico texto={hero.titulo} />
        </h1>
        {hero.textos.map((t) => (
          <p key={t}>{t}</p>
        ))}
        <AbrirCadastro texto={hero.cta} cor="verde" />
      </div>
      <div className="tc-foto">
        <img src={hero.imagem.src} alt={hero.imagem.alt} width={hero.imagem.largura} height={hero.imagem.altura} fetchPriority="high" />
      </div>
    </section>
  );
}
