"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { cadastro as cadastroLP, empreendimento, teaser } from "@/dados";
import { aoDigitarTelefone } from "../util";

/*
 * Diálogo de cadastro do teaser. Abre por "abrir-cadastro" (ver AbrirCadastro).
 * Versão de aprovação: valida como o formulário da LP, mas não envia nada.
 * Para ligar de verdade, poste em /api/lead/ como o LeadForm (e crie um cf_empreendimento próprio).
 */
export default function CadastroTeaser() {
  const { cadastro } = teaser;
  const { aceite } = cadastroLP.form;
  const dlg = useRef<HTMLDialogElement>(null);
  const [titulo, setTitulo] = useState(teaser.hero.cta);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const abrir = (e: Event) => {
      setTitulo((e as CustomEvent<{ titulo: string }>).detail.titulo);
      setEnviado(false);
      dlg.current?.showModal();
    };
    addEventListener("abrir-cadastro", abrir);
    return () => removeEventListener("abrir-cadastro", abrir);
  }, []);

  const submeter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inv = [...e.currentTarget.querySelectorAll("input")].find((i) => !i.checkValidity());
    if (inv) {
      inv.reportValidity();
      return;
    }
    setEnviado(true);
  };

  return (
    <dialog
      className="tz-cad"
      ref={dlg}
      aria-labelledby="tz-cad-t"
      onClick={(e) => {
        if (e.target === e.currentTarget) dlg.current?.close();
      }}
    >
      <div className="tz-cad-in">
        <button className="tz-cad-x" type="button" aria-label={cadastro.fechar} onClick={() => dlg.current?.close()}>
          ×
        </button>
        <span className="tz-rot tz-rot-ipe">{cadastro.rotulo}</span>
        <h2 id="tz-cad-t">{titulo}</h2>
        <form className="tz-form" noValidate hidden={enviado} onSubmit={submeter}>
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
            <input id="tz-ok" name="consentimento" type="checkbox" required />
            <span>
              {aceite.antes}
              <a href={empreendimento.privacidade} target="_blank" rel="noopener">
                {aceite.link}
              </a>
              {aceite.depois}
            </span>
          </label>
          <button className="tz-bt tz-bt-ipe tz-full" type="submit">
            {cadastro.enviar}
          </button>
        </form>
        <p className="tz-ok" role="status" hidden={!enviado}>
          <strong>{cadastro.okTitulo}</strong>
          {cadastro.ok} ({cadastro.aviso})
        </p>
      </div>
    </dialog>
  );
}
