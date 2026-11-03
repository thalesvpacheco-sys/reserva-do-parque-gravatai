/*
 * Monta o zip do teaser para subir na hospedagem do subdomínio (novaharmonia.com.br/teaser-cliente).
 * Uso: npm run teaser:zip   (roda o build, copia o HTML pronto e os arquivos estáticos para
 * teaser-site/ e gera teaser-site.zip, com index.html na raiz do zip).
 */
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";

const base = "/teaser-cliente";
const saida = "teaser-site";
const zip = "teaser-site.zip";

const html = ".next/server/app/teaser-aprovacao.html";
rmSync(html, { force: true });

/*
 * O Next 16.4.0 sai com código 1 ao final do build por causa do aviso de vulnerabilidade
 * (resolver com "next upgrade --agent=security"), mesmo gerando tudo. Por isso o que vale
 * é o HTML ter sido gerado, e não o código de saída.
 */
try {
  execSync("npm run build", { stdio: "inherit", env: { ...process.env, NEXT_PUBLIC_BASE_PATH: base } });
} catch {
  if (!existsSync(html)) throw new Error("O build falhou e não gerou o HTML do teaser.");
  console.warn("Aviso: o build saiu com erro, mas o HTML foi gerado. Confira o aviso do Next acima.");
}

rmSync(saida, { recursive: true, force: true });
rmSync(zip, { force: true });
mkdirSync(saida);

cpSync(html, `${saida}/index.html`);
cpSync(".next/static", `${saida}/_next/static`, { recursive: true });
cpSync("public/img/teaser", `${saida}/img/teaser`, { recursive: true });
cpSync("public/img/logo/logo-nova-harmonia.svg", `${saida}/img/logo/logo-nova-harmonia.svg`);
cpSync("src/app/icon.svg", `${saida}/icon.svg`);
/* o Next gera o ícone em /icon.svg?hash; aqui ele é um arquivo estático comum */

/* confere se toda referência local do HTML existe no pacote */
const pagina = readFileSync(`${saida}/index.html`, "utf8");
const faltando = [...new Set([...pagina.matchAll(/(?:src|href)="(\/teaser\/(?:_next|img)\/[^"?#]+)/g)].map((m) => m[1]))].filter(
  (c) => !existsSync(saida + decodeURIComponent(c).slice(base.length)),
);
if (faltando.length) throw new Error(`Arquivos referenciados e ausentes no pacote:\n${faltando.join("\n")}`);

execSync(`tar -a -cf ${zip} -C ${saida} .`, { stdio: "inherit" });
console.log(`\nPronto: ${zip}`);
