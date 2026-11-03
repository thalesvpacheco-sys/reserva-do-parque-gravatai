import { ArrowRight } from "lucide-react";
import { teaser } from "@/dados";

/* frase da infraestrutura; o "Saiba mais" rola até o formulário de cadastro */
export default function TeaserInfra() {
  const { infra } = teaser;
  return (
    <section className="tz-infra">
      <div className="tz-wrap">
        <p>{infra.texto}</p>
        <a className="tz-bt tz-bt-verde" href="#cadastro">
          {infra.cta} <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
