import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { teaserCorretor } from "@/dados";
import CadastroCorretor from "@/secoes/teaser-corretor/CadastroCorretor";
import CorretorHero from "@/secoes/teaser-corretor/CorretorHero";
import CorretorObras from "@/secoes/teaser-corretor/CorretorObras";
import CorretorPorte from "@/secoes/teaser-corretor/CorretorPorte";
import CorretorRodape from "@/secoes/teaser-corretor/CorretorRodape";
import CorretorVendas from "@/secoes/teaser-corretor/CorretorVendas";
import CorretorViamao from "@/secoes/teaser-corretor/CorretorViamao";
import MonitoramentoRd from "@/secoes/teaser/MonitoramentoRd";
import "../teaser-aprovacao/teaser.css";
import "./teaser-corretor.css";

/* variável (200 a 800), a mesma do teaser dos clientes: os títulos usam 400 e os números 300 */
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta-tz", display: "swap" });

/* fora dos buscadores até o cliente liberar */
export const metadata: Metadata = {
  metadataBase: new URL(teaserCorretor.dominio),
  title: teaserCorretor.seo.titulo,
  description: teaserCorretor.seo.descricao,
  alternates: { canonical: teaserCorretor.url },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Nova Harmonia",
    url: teaserCorretor.url,
    title: teaserCorretor.seo.titulo,
    description: teaserCorretor.seo.descricao,
    images: [{ url: teaserCorretor.seo.og.imagem, width: teaserCorretor.seo.og.largura, height: teaserCorretor.seo.og.altura, alt: teaserCorretor.seo.og.alt }],
  },
  twitter: { card: "summary_large_image", title: teaserCorretor.seo.titulo, description: teaserCorretor.seo.descricao, images: [teaserCorretor.seo.og.imagem] },
};

export default function TeaserCorretor() {
  return (
    <div className={`tz tc ${jakarta.variable}`}>
      <main>
        <CorretorHero />
        <CorretorViamao />
        <CorretorObras />
        <CorretorPorte />
        <CorretorVendas />
        <CadastroCorretor />
      </main>
      <CorretorRodape />
      <MonitoramentoRd />
    </div>
  );
}
