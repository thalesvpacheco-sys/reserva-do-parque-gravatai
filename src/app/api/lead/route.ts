/*
 * Lead: formulário -> POST /api/lead/ -> RD Station (conversão), que repassa ao CV CRM
 * pela integração nativa. Não poste direto no CV, senão o lead duplica.
 */
import { NextResponse } from "next/server";
import { empreendimento } from "@/dados";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RD_URL = "https://api.rd.services/platform/conversions";
const IDENTIFICADOR_PADRAO = "lp-reserva-do-parque-gravatai-formulario-principal";
const UTMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/* texto limpo: sem caracteres de controle nem < >, sem espaços nas pontas, com limite */
const limpar = (v: unknown, max = 200) =>
  typeof v === "string"
    ? v
        .replace(/[\u0000-\u001f\u007f<>]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, max)
    : "";

/* (51) 99999-9999 -> +5551999999999 */
function normalizarTelefone(t: string) {
  let d = t.replace(/\D/g, "");
  if (d.startsWith("55") && d.length >= 12) d = d.slice(2);
  d = d.replace(/^0+/, "");
  return d.length === 10 || d.length === 11 ? `+55${d}` : null;
}

/* o cookie rdtrk guarda {"id":"..."}; o RD espera só o id */
const idRdtrk = (v: string) => {
  try {
    const j = JSON.parse(v);
    return typeof j?.id === "string" ? j.id : v;
  } catch {
    return v;
  }
};

const ok = (status = 200, corpo: Record<string, unknown> = { ok: true }) => NextResponse.json(corpo, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return ok(400, { ok: false, erro: "JSON inválido" });
  }

  /* campo isca preenchido: é robô. Responde ok e descarta */
  if (limpar(body.website)) return ok();

  const nome = limpar(body.nome, 120);
  const email = limpar(body.email, 160).toLowerCase();
  const telefone = normalizarTelefone(limpar(body.telefone, 40));
  const consentimento = body.consentimento === true;

  const erros: string[] = [];
  if (nome.length < 2) erros.push("nome");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) erros.push("email");
  if (!telefone) erros.push("telefone");
  if (!consentimento) erros.push("consentimento");
  if (erros.length) return ok(400, { ok: false, erro: "Campos inválidos", campos: erros });

  const rastreio = Object.fromEntries(
    [...UTMS, "gclid", "fbclid"].map((c) => [c, limpar(body[c], 300)]).filter(([, v]) => v),
  ) as Record<string, string>;
  const rdtrk = limpar(body.rdtrk, 500);
  const lead = { nome, email, telefone, consentimento, ...rastreio, ...(rdtrk ? { rdtrk } : {}) };

  const apiKey = process.env.RD_API_KEY;
  if (!apiKey) {
    console.error("[lead] RD_API_KEY não configurada. Lead não enviado:", JSON.stringify(lead));
    return ok(500, { ok: false, erro: "Envio indisponível" });
  }

  const cv = process.env.CV_IDEMPREENDIMENTO;
  const payload = {
    event_type: "CONVERSION",
    event_family: "CDP",
    payload: {
      conversion_identifier: process.env.RD_CONVERSION_IDENTIFIER || IDENTIFICADOR_PADRAO,
      name: nome,
      email,
      mobile_phone: telefone,
      personal_phone: telefone,
      cf_empreendimento: empreendimento.rd,
      ...(cv ? { cf_idempreendimento: cv } : {}),
      /* UTMs nos campos padrão do RD; utm_content, gclid e fbclid em campos personalizados */
      ...(rastreio.utm_source ? { traffic_source: rastreio.utm_source } : {}),
      ...(rastreio.utm_medium ? { traffic_medium: rastreio.utm_medium } : {}),
      ...(rastreio.utm_campaign ? { traffic_campaign: rastreio.utm_campaign } : {}),
      ...(rastreio.utm_term ? { traffic_value: rastreio.utm_term } : {}),
      ...(rastreio.utm_content ? { cf_utm_content: rastreio.utm_content } : {}),
      ...(rastreio.gclid ? { cf_gclid: rastreio.gclid } : {}),
      ...(rastreio.fbclid ? { cf_fbclid: rastreio.fbclid } : {}),
      ...(rdtrk ? { client_tracking_id: idRdtrk(rdtrk) } : {}),
      available_for_mailing: true,
      legal_bases: [{ category: "communications", type: "consent", status: "granted" }],
    },
  };

  /* até 3 tentativas quando o RD responde 429 (limite de requisições) */
  let ultimo = "";
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    try {
      const r = await fetch(`${RD_URL}?api_key=${encodeURIComponent(apiKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      if (r.ok) return ok();
      ultimo = `${r.status} ${await r.text().catch(() => "")}`;
      if (r.status !== 429 || tentativa === 3) break;
      const espera = Number(r.headers.get("retry-after")) * 1000 || 1000 * tentativa;
      await new Promise((res) => setTimeout(res, Math.min(espera, 5000)));
    } catch (e) {
      ultimo = e instanceof Error ? e.message : String(e);
      break;
    }
  }

  console.error("[lead] Falha ao enviar ao RD Station:", ultimo, "Lead:", JSON.stringify(lead));
  return ok(502, { ok: false, erro: "Falha no envio" });
}
