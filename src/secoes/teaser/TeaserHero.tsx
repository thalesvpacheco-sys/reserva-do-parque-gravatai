import { teaser } from "@/dados";
import { Rico } from "../Texto";
import AbrirCadastro from "./AbrirCadastro";

export default function TeaserHero() {
  const { hero, logo } = teaser;
  return (
    <section className="tz-hero">
      <header className="tz-topo">
        <img src={logo.src} alt={logo.alt} width={logo.largura} height={logo.altura} />
      </header>
      <div className="tz-wrap">
        <h1>
          <Rico texto={hero.titulo} />
        </h1>
        <p>{hero.texto}</p>
        <AbrirCadastro texto={hero.cta} cor="verde" />
        <span className="tz-desce" aria-hidden="true">
          {hero.role}
          <i></i>
        </span>
      </div>
    </section>
  );
}
