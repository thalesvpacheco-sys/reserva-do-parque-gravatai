"use client";

import { useSyncExternalStore } from "react";
import { CAMPOS_RASTREIO } from "../util";

/*
 * O RD lê todos os campos do formulário na hora do clique, inclusive os escondidos, e a planilha
 * de backup também (planilha.ts). Os campos cf_utm_* existem porque o RD sozinho perde parte da
 * campanha: o cookie dele sobrescreve o traffic_source e a URL da conversão vai sem os parâmetros.
 */
const CAMPOS_RD: Record<(typeof CAMPOS_RASTREIO)[number], string[]> = {
  utm_source: ["traffic_source", "cf_utm_source"],
  utm_medium: ["traffic_medium", "cf_utm_medium"],
  utm_campaign: ["traffic_campaign", "cf_utm_campaign"],
  utm_term: ["traffic_value", "cf_utm_term"],
  utm_content: ["cf_utm_content"],
  gclid: ["cf_gclid"],
  fbclid: ["cf_fbclid"],
};

const CHAVE = "rp-campanha-teaser";

/*
 * Vale a campanha inteira da última visita que veio com parâmetros, sem misturar duas campanhas.
 * Fica guardada para quem volta depois sem UTM na URL. A LP tem regra própria, em util.ts.
 */
function lerCampanha(): { campos: Record<string, string>; url: string } {
  const q = new URLSearchParams(location.search);
  const campos = Object.fromEntries(CAMPOS_RASTREIO.flatMap((c) => (q.get(c) ? [[c, q.get(c) as string]] : [])));
  const atual = { campos, url: location.href.split("#")[0] };
  try {
    if (Object.keys(campos).length) {
      localStorage.setItem(CHAVE, JSON.stringify(atual));
      return atual;
    }
    return JSON.parse(localStorage.getItem(CHAVE) || "null") ?? atual;
  } catch {
    return atual;
  }
}

const semAssinatura = () => () => {};

/* em texto, para o React comparar por valor; a URL e o localStorage não mudam com a página aberta */
const lerCampos = () => {
  const { campos, url } = lerCampanha();
  const pares = CAMPOS_RASTREIO.filter((c) => campos[c]).flatMap((c) => CAMPOS_RD[c].map((nome) => [nome, campos[c]]));
  return JSON.stringify([...pares, ["cf_url_entrada", url]]);
};

export default function CamposRastreioRd() {
  const campos = useSyncExternalStore(semAssinatura, lerCampos, () => "[]");

  return (
    <>
      {(JSON.parse(campos) as [string, string][]).map(([nome, valor]) => (
        <input key={nome} type="hidden" name={nome} value={valor} />
      ))}
    </>
  );
}
