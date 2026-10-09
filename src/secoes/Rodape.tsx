import { ArrowUp, Facebook, MessageCircle } from "lucide-react";
import { contato, empreendimento, rodape } from "@/dados";
import { Valor } from "./Texto";
import { linkWhatsApp } from "./whatsapp";

export default function Rodape() {
  const { colunaBairro, colunaAtendimento, colunaRealizacao } = rodape;
  return (
    <footer className="rod">
      <img className="rod-bg" src={rodape.tracado} alt="" aria-hidden="true" />
      <div className="wrap rod-g">
        <div className="rod-marca">
          <img className="rod-logo" src={rodape.logo.src} alt={rodape.logo.alt} />
          <p>{rodape.texto}</p>
          <div className="redes">
            <a href={empreendimento.facebook} target="_blank" rel="noopener" aria-label={rodape.redes.facebook}>
              <Facebook aria-hidden="true" />
            </a>
            <a {...linkWhatsApp()} aria-label={rodape.redes.whatsapp}>
              <MessageCircle aria-hidden="true" />
            </a>
          </div>
        </div>
        <nav className="rod-col" aria-label={rodape.navRotulo}>
          <h3>{colunaBairro.titulo}</h3>
          <ul>
            {colunaBairro.links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.t}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="rod-col">
          <h3>{colunaAtendimento.titulo}</h3>
          <ul>
            <li>
              <small>{colunaAtendimento.whatsapp}</small>
              <Valor texto={contato.telefone} />
            </li>
            <li>
              <small>{colunaAtendimento.email}</small>
              <Valor texto={contato.email} />
            </li>
            <li>
              <small>{colunaAtendimento.stand}</small>
              <Valor texto={empreendimento.endereco} />
            </li>
          </ul>
          <a className="bt bt-verde" href={colunaAtendimento.cta.href}>
            {colunaAtendimento.cta.t}
          </a>
        </div>
        <div className="rod-col">
          <h3>{colunaRealizacao.titulo}</h3>
          <div className="rod-real">
            {colunaRealizacao.logos.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} />
            ))}
            <a href={empreendimento.siteGrupo} target="_blank" rel="noopener">
              {colunaRealizacao.site}
            </a>
          </div>
        </div>
      </div>
      <div className="wrap rod-base">
        <p>
          {rodape.copyright.antes} <Valor texto={empreendimento.cnpj} /> {rodape.copyright.depois}
        </p>
        <nav aria-label={rodape.legaisRotulo}>
          <a href={empreendimento.privacidade} target="_blank" rel="noopener">
            {rodape.privacidade}
          </a>
          <a href={rodape.memorial.href}>{rodape.memorial.t}</a>
          <a className="rod-topo" href="#">
            <ArrowUp aria-hidden="true" /> {rodape.topo}
          </a>
        </nav>
      </div>
    </footer>
  );
}
