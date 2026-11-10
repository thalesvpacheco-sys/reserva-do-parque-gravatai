import { planilhaLeads } from "@/dados";

/*
 * Cópia do lead na planilha de backup, independente do RD: chega mesmo se o script do RD for
 * bloqueado. Quem recebe é o Apps Script de scripts/planilha-leads.gs. Em no-cors não dá para ler
 * a resposta, então a confirmação na tela não depende deste envio.
 */
export function enviarPlanilha(form: HTMLFormElement) {
  if (!planilhaLeads) return;
  const corpo = new URLSearchParams();
  new FormData(form).forEach((valor, nome) => corpo.append(nome, String(valor)));
  corpo.set("teaser", form.getAttribute("name") ?? "");
  fetch(planilhaLeads, { method: "POST", mode: "no-cors", body: corpo, keepalive: true }).catch(() => {});
}
