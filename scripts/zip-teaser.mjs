/*
 * Monta o zip de um teaser para subir numa pasta da hospedagem do WordPress.
 * Uso: npm run teaser:zip    (clientes,   novaharmonia.com.br/teaser-cliente/)
 *      npm run corretor:zip  (corretores, novaharmonia.com.br/teaser-corretor/)
 * Roda o build, copia o HTML pronto e os arquivos estáticos para a pasta de saída e gera o zip,
 * com index.html na raiz do zip. O zip deve ser extraído DENTRO da pasta de mesmo nome da base.
 */
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";

const teasers = {
  cliente: { base: "/teaser-cliente", rota: "teaser-aprovacao", saida: "teaser-site", imagens: "teaser", logo: "logo-nova-harmonia.svg" },
  corretor: { base: "/teaser-corretor", rota: "teaser-corretor", saida: "teaser-corretor-site", imagens: "teaser-corretor", logo: "logo-nova-harmonia-simples.svg" },
};

const { base, rota, saida, imagens, logo } = teasers[process.argv[2] ?? "cliente"] ?? {};
if (!base) throw new Error(`Teaser desconhecido. Use: ${Object.keys(teasers).join(" ou ")}`);
const zip = `${saida}.zip`;

const html = `.next/server/app/${rota}.html`;
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
cpSync(`public/img/${imagens}`, `${saida}/img/${imagens}`, { recursive: true });
cpSync(`public/img/logo/${logo}`, `${saida}/img/logo/${logo}`);
cpSync("src/app/icon.svg", `${saida}/icon.svg`);
/* o Next gera o ícone em /icon.svg?hash; aqui ele é um arquivo estático comum */

/* confere se toda referência local do HTML existe no pacote */
const pagina = readFileSync(`${saida}/index.html`, "utf8");
const referencias = [...pagina.matchAll(new RegExp(`(?:src|href)="(${base}/(?:_next|img)/[^"?#]+)`, "g"))].map((m) => m[1]);
if (!referencias.length) throw new Error(`Nenhuma referência a ${base}/ no HTML. O basePath foi aplicado?`);
const faltando = [...new Set(referencias)].filter((c) => !existsSync(saida + decodeURIComponent(c).slice(base.length)));
if (faltando.length) throw new Error(`Arquivos referenciados e ausentes no pacote:\n${faltando.join("\n")}`);

execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File scripts/zip.ps1 ${saida} ${zip}`, { stdio: "inherit" });
console.log(`\nPronto: ${zip}`);
