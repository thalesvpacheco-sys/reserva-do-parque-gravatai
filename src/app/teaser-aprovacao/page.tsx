import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { teaser } from "@/dados";
import CadastroTeaser from "@/secoes/teaser/CadastroTeaser";
import TeaserFamilia from "@/secoes/teaser/TeaserFamilia";
import TeaserHero from "@/secoes/teaser/TeaserHero";
import TeaserObras from "@/secoes/teaser/TeaserObras";
import TeaserRodape from "@/secoes/teaser/TeaserRodape";
import TeaserSolidez from "@/secoes/teaser/TeaserSolidez";
import TeaserZoom from "@/secoes/teaser/TeaserZoom";
import "./teaser.css";

/* variável (200 a 800): o layout só carrega até o 700 e os números grandes do teaser usam 800 */
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta-tz", display: "swap" });

/* página de aprovação do cliente: fora dos buscadores */
export const metadata: Metadata = {
  title: teaser.seo.titulo,
  description: teaser.seo.descricao,
  alternates: { canonical: teaser.url },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: teaser.url,
    title: teaser.seo.titulo,
    description: teaser.seo.descricao,
    images: [{ url: teaser.seo.og.imagem, width: teaser.seo.og.largura, height: teaser.seo.og.altura, alt: teaser.seo.og.alt }],
  },
};

export default function TeaserAprovacao() {
  return (
    <div className={`tz ${jakarta.variable}`}>
      <main>
        <TeaserHero />
        <TeaserZoom />
        <TeaserSolidez />
        <TeaserObras />
        <TeaserFamilia />
      </main>
      <TeaserRodape />
      <CadastroTeaser />
    </div>
  );
}
