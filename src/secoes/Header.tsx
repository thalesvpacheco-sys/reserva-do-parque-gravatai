"use client";

import { useSyncExternalStore } from "react";
import { ArrowRight, MapPin, MessageCircle, X } from "lucide-react";
import { contato, header } from "@/dados";
import { Valor } from "./Texto";
import { pad } from "./util";
import { linkWhatsApp } from "./whatsapp";

const assinarRolagem = (f: () => void) => {
  addEventListener("scroll", f, { passive: true });
  return () => removeEventListener("scroll", f);
};

export default function Header() {
  /* fica sólido depois de 60px de rolagem; a barra de topo recolhe junto (CSS) */
  const solido = useSyncExternalStore(assinarRolagem, () => scrollY > 60, () => false);
  const { marca, topo, nav, cta, menu } = header;

  return (
    <>
      <header className={`cab cab-2l${solido ? " solido" : ""}`}>
        <div className="cab-topo">
          <div className="wrap">
            <span>
              <MapPin aria-hidden="true" /> {topo.local}
            </span>
            <span className="so-desk">
              {topo.atendimento} <Valor texto={contato.telefone} />
            </span>
            <a {...linkWhatsApp()}>
              <MessageCircle aria-hidden="true" /> {contato.whatsappTexto}
            </a>
          </div>
        </div>
        <div className="wrap">
          <a className="marca" href="#" aria-label={marca.rotulo}>
            <img className="escuro" src={marca.escuro.src} alt="" width={marca.escuro.largura} height={marca.escuro.altura} />
            <img className="claro" src={marca.claro.src} alt="" width={marca.claro.largura} height={marca.claro.altura} />
          </a>
          <nav aria-label={header.navRotulo}>
            <ul>
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.t}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="acoes">
            <a className="bt bt-verde" href={cta.href}>
              {cta.t}
            </a>
          </div>
        </div>
      </header>
      {/* menu em tela cheia do protótipo: fica escondido, porque o header Duas linhas não tem botão para abrir */}
      <div className="menu-tela" id="menu-tela" hidden>
        <div className="wrap menu-g">
          <nav aria-label={header.navRotulo}>
            <ol>
              {nav.map((l, i) => (
                <li key={l.href}>
                  <a href={l.href}>
                    <small>{pad(i + 1)}</small>
                    {l.t}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <figure className="menu-foto">
            <img src={menu.foto} alt="" />
          </figure>
          <div className="menu-pe">
            <p>
              {menu.atendimento} <Valor texto={contato.telefone} />
            </p>
            <a className="bt bt-areia" href={cta.href}>
              {cta.t} <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <button className="menu-fechar" type="button" aria-label={menu.fechar}>
            <X aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
