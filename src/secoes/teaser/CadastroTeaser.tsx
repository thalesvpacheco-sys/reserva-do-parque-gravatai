"use client";

import { useState, type FormEvent } from "react";
import { cadastro as cadastroLP, empreendimento, teaser } from "@/dados";
import { aoDigitarTelefone } from "../util";
import CamposRastreioRd from "./CamposRastreioRd";
import { enviarPlanilha } from "./planilha";

/*
 * Formulário de cadastro do teaser, aberto na página. O código de monitoramento do RD (MonitoramentoRd)
 * captura o envio sozinho, no clique do botão, se o formulário estiver válido. Por isso o <form> precisa
 * estar no HTML desde o início, o name dele é o identificador da conversão e o botão não pode ser recriado.
 * Aqui validamos, mandamos a cópia para a planilha e mostramos a confirmação. Campos e mapeamento: README, "Lead dos teasers".
 */
export default function CadastroTeaser() {
  const { cadastro } = teaser;
  const { aceite } = cadastroLP.form;
  const [enviado, setEnviado] = useState(false);

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
    <section className="tz-cad" id="cadastro" aria-labelledby="tz-cad-t">
      <div className="tz-cad-in">
        <span className="tz-rot tz-rot-ipe">{cadastro.rotulo}</span>
        <h2 id="tz-cad-t">{cadastro.titulo}</h2>
        <form className="tz-form" name={cadastro.identificadorRd} noValidate hidden={enviado} onSubmit={submeter}>
          <label className="tz-full" htmlFor="tz-nome">
            {cadastro.nome.rotulo}
            <input id="tz-nome" name="nome" type="text" autoComplete="name" placeholder={cadastro.nome.placeholder} required minLength={2} />
          </label>
          <label htmlFor="tz-tel">
            {cadastro.telefone.rotulo}
            <input
              id="tz-tel"
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
          <label htmlFor="tz-cidade">
            {cadastro.cidade.rotulo}
            <select id="tz-cidade" name="cidade">
              {cadastro.cidade.opcoes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="tz-full" htmlFor="tz-email">
            {cadastro.email.rotulo}
            <input id="tz-email" name="email" type="email" autoComplete="email" placeholder={cadastro.email.placeholder} required />
          </label>
          <label className="tz-full tz-aceite" htmlFor="tz-ok">
            <input id="tz-ok" name="consentimento" type="checkbox" value="1" data-privacy="true" required />
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
        <p className="tz-ok" role="status" hidden={!enviado}>
          <strong>{cadastro.okTitulo}</strong>
          {cadastro.ok}
        </p>
      </div>
    </section>
  );
}
