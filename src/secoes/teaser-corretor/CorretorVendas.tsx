import { teaserCorretor } from "@/dados";
import AbrirCadastro from "../teaser/AbrirCadastro";

export default function CorretorVendas() {
  const { vendas } = teaserCorretor;
  return (
    <section className="tc-vendas">
      <div className="tc-foto">
        <img src={vendas.imagem.src} alt={vendas.imagem.alt} width={vendas.imagem.largura} height={vendas.imagem.altura} loading="lazy" decoding="async" />
      </div>
      <div className="tc-vendas-txt">
        <h2>{vendas.titulo}</h2>
        {vendas.textos.map((t) => (
          <p key={t}>{t}</p>
        ))}
        <AbrirCadastro texto={vendas.cta} cor="verde" />
      </div>
    </section>
  );
}
