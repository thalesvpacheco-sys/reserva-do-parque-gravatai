import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { teaser } from "@/dados";
import CadastroTeaser from "@/secoes/teaser/CadastroTeaser";
import MonitoramentoRd from "@/secoes/teaser/MonitoramentoRd";
import TeaserFamilia from "@/secoes/teaser/TeaserFamilia";
import TeaserHero from "@/secoes/teaser/TeaserHero";
import TeaserHistoria from "@/secoes/teaser/TeaserHistoria";
import TeaserInfra from "@/secoes/teaser/TeaserInfra";
import TeaserRodape from "@/secoes/teaser/TeaserRodape";
import TeaserSolidez from "@/secoes/teaser/TeaserSolidez";
import TeaserZoom from "@/secoes/teaser/TeaserZoom";
import "./teaser.css";

/* variável (200 a 800): o layout só carrega até o 700 e os números grandes do teaser usam 800 */
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta-tz", display: "swap" });

/* fora dos buscadores até o cliente liberar */
export const metadata: Metadata = {
  metadataBase: new URL(teaser.dominio),
  title: teaser.seo.titulo,
  description: teaser.seo.descricao,
  alternates: { canonical: teaser.url },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Nova Harmonia",
    url: teaser.url,
    title: teaser.seo.titulo,
    description: teaser.seo.descricao,
    images: [{ url: teaser.seo.og.imagem, width: teaser.seo.og.largura, height: teaser.seo.og.altura, alt: teaser.seo.og.alt }],
  },
  twitter: { card: "summary_large_image", title: teaser.seo.titulo, description: teaser.seo.descricao, images: [teaser.seo.og.imagem] },
};

export default function TeaserAprovacao() {
  return (
    <div className={`tz ${jakarta.variable}`}>
      <main>
        <TeaserHero />
        <TeaserZoom />
        <TeaserSolidez />
        <TeaserInfra />
        <TeaserHistoria />
        <TeaserFamilia />
        <CadastroTeaser />
      </main>
      <TeaserRodape />
      <MonitoramentoRd />
    </div>
  );
}
