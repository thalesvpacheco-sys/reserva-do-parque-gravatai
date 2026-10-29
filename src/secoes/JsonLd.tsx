import { contato, empreendimento, faq, seo } from "@/dados";
import { pendente, urlSite } from "./util";

/* dados estruturados da LP (Organization, Place e FAQPage). Só a home usa, as outras rotas não herdam */
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

export default function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />;
}
