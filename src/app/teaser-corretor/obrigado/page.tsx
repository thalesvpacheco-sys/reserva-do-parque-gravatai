import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { teaserCorretor } from "@/dados";
import CorretorRodape from "@/secoes/teaser-corretor/CorretorRodape";
import MonitoramentoRd from "@/secoes/teaser/MonitoramentoRd";
import "../../teaser-aprovacao/teaser.css";
import "../teaser-corretor.css";

/* a mesma fonte da página do teaser */
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta-tz", display: "swap" });

const { obrigado, logo, url, dominio } = teaserCorretor;

/* fora dos buscadores, como o teaser */
export const metadata: Metadata = {
  metadataBase: new URL(dominio),
  title: obrigado.titulo,
  alternates: { canonical: `${url}obrigado/` },
  robots: { index: false, follow: false },
};

export default function ObrigadoCorretor() {
  return (
    <div className={`tz tc ${jakarta.variable}`}>
      <main className="tz-obg">
        <div className="tz-wrap">
          <a href={url}>
            <img className="tz-obg-logo" src={logo.src} alt={logo.alt} width={logo.largura} height={logo.altura} />
          </a>
          <span className="tz-obg-ok" aria-hidden="true">
            <Check strokeWidth={2.4} />
          </span>
          <span className="tz-rot">{obrigado.rotulo}</span>
          <h1>{obrigado.h1}</h1>
          <p>{obrigado.texto}</p>
          <div className="tz-obg-bts">
            <a className="tz-bt tz-bt-verde" href={obrigado.cta.href} target="_blank" rel="noopener">
              {obrigado.cta.rotulo} <ArrowRight aria-hidden="true" />
            </a>
            <a className="tz-obg-volta" href={url}>
              <ArrowLeft aria-hidden="true" /> {obrigado.voltar}
            </a>
          </div>
        </div>
      </main>
      <CorretorRodape />
      <MonitoramentoRd />
    </div>
  );
}
