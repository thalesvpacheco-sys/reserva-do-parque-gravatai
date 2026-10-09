import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { contato, empreendimento, faq, seo } from "@/dados";
import { pendente, urlSite } from "@/secoes/util";
import "./globals.css";
import "./lp.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(urlSite),
  title: seo.titulo,
  description: seo.descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seo.local,
    url: "/",
    siteName: seo.titulo,
    title: seo.titulo,
    description: seo.descricao,
    images: [{ url: seo.og.imagem, width: seo.og.largura, height: seo.og.altura, alt: seo.og.alt }],
  },
  twitter: { card: "summary_large_image", title: seo.titulo, description: seo.descricao, images: [seo.og.imagem] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#172f1b" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${urlSite}/#organizacao`,
      name: empreendimento.incorporadora,
      legalName: empreendimento.razaoSocial,
      url: empreendimento.siteGrupo,
      logo: `${urlSite}${seo.logo}`,
      sameAs: [empreendimento.facebook],
      ...(pendente(contato.telefone) ? {} : { telephone: contato.telefone }),
      ...(pendente(contato.email) ? {} : { email: contato.email }),
    },
    {
      "@type": "Place",
      "@id": `${urlSite}/#lugar`,
      name: empreendimento.nomeCompleto,
      description: seo.descricao,
      url: urlSite,
      image: `${urlSite}${seo.og.imagem}`,
      address: {
        "@type": "PostalAddress",
        ...(pendente(empreendimento.endereco) ? {} : { streetAddress: empreendimento.endereco }),
        addressLocality: empreendimento.cidade,
        addressRegion: empreendimento.uf,
        addressCountry: "BR",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.itens.map((q) => ({
        "@type": "Question",
        name: q.p,
        acceptedAnswer: { "@type": "Answer", text: q.r },
      })),
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  /* data-hero-escuro já vem ligado: a página abre com o hero escuro atrás do header (o HeroPainel atualiza ao rolar) */
  return (
    <html lang="pt-BR" className={jakarta.variable} data-hero-escuro="" data-scroll-behavior="smooth">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
