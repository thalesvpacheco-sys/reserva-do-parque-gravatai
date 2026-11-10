import { teaserCorretor } from "@/dados";

export default function CorretorRodape() {
  const { logo, rodape } = teaserCorretor;
  return (
    <footer className="tz-rod">
      <div className="tz-wrap">
        <img src={logo.src} alt={logo.alt} width={logo.largura} height={logo.altura} />
        <small>{rodape.copyright}</small>
        <small className="tz-legal">{rodape.legal}</small>
      </div>
    </footer>
  );
}
