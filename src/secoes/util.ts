import { PREENCHER, seo } from "@/dados";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const suave = (p: number) => 1 - Math.pow(1 - p, 3);
export const pad = (n: number) => String(n).padStart(2, "0");
export const reduz = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
export const pendente = (s: string) => s.startsWith(PREENCHER);

/* domínio do site; enquanto seo.url for [PREENCHER], as URLs absolutas usam localhost */
export const urlSite = /^https?:\/\//.test(seo.url) ? seo.url.replace(/\/$/, "") : "http://localhost:3000";

/* máscara (00) 00000-0000, igual à do protótipo */
export const mascaraTelefone = (valor: string) => {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  return d.length > 10
    ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
    : d.length > 6
      ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
      : d.length > 2
        ? `(${d.slice(0, 2)}) ${d.slice(2)}`
        : d;
};
export const aoDigitarTelefone = (e: { currentTarget: HTMLInputElement }) => {
  e.currentTarget.value = mascaraTelefone(e.currentTarget.value);
};

/* rastreio do lead: UTMs e ids de clique guardados da URL na primeira visita */
export const CAMPOS_RASTREIO = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;
const CHAVE = "rp-rastreio";

export function guardarRastreio() {
  try {
    if (localStorage.getItem(CHAVE)) return;
    const q = new URLSearchParams(location.search);
    const r: Record<string, string> = {};
    CAMPOS_RASTREIO.forEach((c) => {
      const v = q.get(c);
      if (v) r[c] = v;
    });
    if (Object.keys(r).length) localStorage.setItem(CHAVE, JSON.stringify(r));
  } catch {}
}

export function lerRastreio(): Record<string, string> {
  let r: Record<string, string> = {};
  try {
    r = JSON.parse(localStorage.getItem(CHAVE) || "{}");
  } catch {}
  /* a URL atual vale para o que não foi guardado */
  const q = new URLSearchParams(location.search);
  CAMPOS_RASTREIO.forEach((c) => {
    const v = q.get(c);
    if (v && !r[c]) r[c] = v;
  });
  const rdtrk = document.cookie.split("; ").find((c) => c.startsWith("rdtrk="));
  if (rdtrk) r.rdtrk = decodeURIComponent(rdtrk.slice(6));
  return r;
}
