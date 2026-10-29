import { empreendimento, teaser } from "@/dados";

export default function TeaserRodape() {
  const { logo, rodape, confirmar } = teaser;
  return (
    <footer className="tz-rod">
      <div className="tz-wrap">
        <img src={logo.src} alt={logo.alt} width={logo.largura} height={logo.altura} />
        <p>
          <b className="tz-pend" title={confirmar.telefone}>
            {rodape.telefone}
          </b>
          <i aria-hidden="true"></i>
          <a href={empreendimento.siteGrupo} target="_blank" rel="noopener">
            {rodape.site}
          </a>
        </p>
        <small>{rodape.copyright}</small>
      </div>
    </footer>
  );
}
