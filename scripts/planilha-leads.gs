/*
 * Recebe os leads dos teasers na planilha "Backup NV HARMONIA - LEADS lançamento".
 * Colar em Extensões > Apps Script, dentro da planilha, e implantar como app da Web
 * (passo a passo no README, "Lead dos teasers"). Os títulos são criados no primeiro lead.
 * A URL da implantação só permite escrever: quem a tem não consegue ler a planilha.
 */
const TEASERS = {
  "teaser-cliente-nova-harmonia": "Clientes",
  "teaser-corretor-nova-harmonia": "Corretores",
};

/* [título da coluna, nome do campo no formulário] */
const COLUNAS = [
  ["Nome", "nome"],
  ["WhatsApp", "telefone"],
  ["E-mail", "email"],
  ["Cidade", "cidade"],
  ["Perfil", "perfil"],
  ["Imobiliária", "imobiliaria"],
  ["Aceite", "consentimento"],
  ["utm_source", "cf_utm_source"],
  ["utm_medium", "cf_utm_medium"],
  ["utm_campaign", "cf_utm_campaign"],
  ["utm_content", "cf_utm_content"],
  ["utm_term", "cf_utm_term"],
  ["gclid", "cf_gclid"],
  ["fbclid", "cf_fbclid"],
  ["URL de entrada", "cf_url_entrada"],
];

/* o endereço é público: um texto começando com = viraria fórmula na planilha */
function celula(valor) {
  const texto = String(valor || "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 2000);
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function doPost(e) {
  const p = (e && e.parameter) || {};
  const valido = TEASERS[p.teaser] && p.consentimento && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(p.email || "");
  if (!valido) return ContentService.createTextOutput("ignorado");

  const trava = LockService.getScriptLock();
  trava.waitLock(10000);
  try {
    const aba = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (aba.getLastRow() === 0) {
      aba.appendRow(["Data", "Teaser"].concat(COLUNAS.map((c) => c[0])));
      aba.setFrozenRows(1);
    }
    const data = Utilities.formatDate(new Date(), "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");
    aba.appendRow([data, TEASERS[p.teaser]].concat(COLUNAS.map((c) => celula(p[c[1]]))));
  } finally {
    trava.releaseLock();
  }
  return ContentService.createTextOutput("ok");
}
