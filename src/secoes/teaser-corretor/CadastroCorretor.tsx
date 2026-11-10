"use client";

import { useState, type FormEvent } from "react";
import { cadastro as cadastroLP, empreendimento, teaserCorretor } from "@/dados";
import { aoDigitarTelefone } from "../util";
import CamposRastreioRd from "../teaser/CamposRastreioRd";
import { enviarPlanilha } from "../teaser/planilha";

/*
 * Formulário de cadastro dos corretores, aberto na página. O código de monitoramento do RD (MonitoramentoRd)
 * captura o envio sozinho, no clique do botão, se o formulário estiver válido. Por isso o <form> precisa
 * estar no HTML desde o início, o name dele é o identificador da conversão e o botão não pode ser recriado.
 * Aqui validamos, mandamos a cópia para a planilha e mostramos a confirmação. Campos e mapeamento: README, "Lead dos teasers".
 */
export default function CadastroCorretor() {
  const { cadastro } = teaserCorretor;
  const { aceite } = cadastroLP.form;
  const [perfil, setPerfil] = useState(cadastro.perfis[0].valor);
  const [enviado, setEnviado] = useState(false);
  const pedeImobiliaria = cadastro.perfis.find((p) => p.valor === perfil)?.imobiliaria ?? false;

  const submeter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inv = [...e.currentTarget.querySelectorAll("input")].find((i) => !i.checkValidity());
    if (inv) {
      inv.reportValidity();
      return;
    }
    enviarPlanilha(e.currentTarget);
    setEnviado(true);
  };

  return (
    <section className="tc-cad" id="cadastro" aria-labelledby="tc-cad-t">
      <div className="tz-wrap">
        <div className="tc-cad-tit">
          <span className="tz-rot">{cadastro.rotulo}</span>
          <h2 id="tc-cad-t">{cadastro.titulo}</h2>
        </div>
        <div className="tc-cartao">
          <form className="tz-form" name={cadastro.identificadorRd} noValidate hidden={enviado} onSubmit={submeter}>
            <fieldset className="tz-full">
              <legend>{cadastro.perfil}</legend>
              <div className="tc-perfis">
                {cadastro.perfis.map((p) => (
                  <label key={p.valor}>
                    <input type="radio" name="perfil" value={p.valor} checked={perfil === p.valor} onChange={() => setPerfil(p.valor)} />
                    <span>{p.rotulo}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            {pedeImobiliaria && (
              <label className="tz-full" htmlFor="tc-imob">
                {cadastro.imobiliaria.rotulo}
                <input id="tc-imob" name="imobiliaria" type="text" autoComplete="organization" placeholder={cadastro.imobiliaria.placeholder} required />
              </label>
            )}
            <label className="tz-full" htmlFor="tc-nome">
              {cadastro.nome.rotulo}
              <input id="tc-nome" name="nome" type="text" autoComplete="name" placeholder={cadastro.nome.placeholder} required minLength={2} />
            </label>
            <label htmlFor="tc-tel">
              {cadastro.telefone.rotulo}
              <input
                id="tc-tel"
                name="telefone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={cadastro.telefone.placeholder}
                required
                minLength={14}
                onInput={aoDigitarTelefone}
              />
            </label>
            <label htmlFor="tc-cidade">
              {cadastro.cidade.rotulo}
              <select id="tc-cidade" name="cidade">
                {cadastro.cidade.opcoes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="tz-full" htmlFor="tc-email">
              {cadastro.email.rotulo}
              <input id="tc-email" name="email" type="email" autoComplete="email" placeholder={cadastro.email.placeholder} required />
            </label>
            <label className="tz-full tc-aceite" htmlFor="tc-ok">
              <input id="tc-ok" name="consentimento" type="checkbox" value="1" data-privacy="true" required />
              <span>
                {aceite.antes}
                <a href={empreendimento.privacidade} target="_blank" rel="noopener">
                  {aceite.link}
                </a>
                {aceite.depois}
              </span>
            </label>
            <CamposRastreioRd />
            <button className="tz-bt tz-bt-ipe tz-full" type="submit">
              {cadastro.enviar}
            </button>
          </form>
          <p className="tc-ok" role="status" hidden={!enviado}>
            <strong>{cadastro.okTitulo}</strong>
            {cadastro.ok}
          </p>
        </div>
      </div>
    </section>
  );
}
