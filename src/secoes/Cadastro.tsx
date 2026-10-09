import { MessageCircle } from "lucide-react";
import { cadastro, contato } from "@/dados";
import LeadForm from "./LeadForm";
import { Rico, Valor } from "./Texto";
import { linkWhatsApp, temWhatsApp } from "./whatsapp";

export default function Cadastro() {
  const { card } = cadastro;
  const whats = (
    <>
      <MessageCircle aria-hidden="true" /> {contato.whatsappTexto}
    </>
  );

  return (
    <section id="cadastro" className="cad">
      <div className="wrap cad-g">
        <div className="cad-txt">
          <p className="rot">{cadastro.rotulo}</p>
          <h2 className="titulo">
            <Rico texto={cadastro.titulo} />
          </h2>
          <ol className="cad-passos">
            {cadastro.passos.map((p) => (
              <li key={p.n}>
                <span>{p.n}</span>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="cad-card">
          <div className="cad-topo">
            <img src={card.simbolo.src} alt="" width={card.simbolo.largura} height={card.simbolo.altura} />
            <div>
              <strong>{card.titulo}</strong>
              <span>{card.sub}</span>
            </div>
          </div>
          <div className="cad-corpo">
            <LeadForm />
            <div className="conversar">
              <p>{cadastro.conversar}</p>
              <div className="fone">
                <Valor texto={contato.telefone} />
              </div>
              {/* no protótipo é só um selo; vira link quando o telefone for preenchido */}
              {temWhatsApp() ? (
                <a className="bt-whats" {...linkWhatsApp()}>
                  {whats}
                </a>
              ) : (
                <span className="bt-whats">{whats}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
