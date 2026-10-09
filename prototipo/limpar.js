// gera a versão escolhida (sem painel de variações) a partir do index.html
const fs=require('fs');const {chromium}=require('playwright-core');
const [c,h,s]=(process.argv[2]||'4-2-2').split('-').map(Number);
(async()=>{const b=await chromium.launch({executablePath:process.env.HOME+'/.cache/ms-playwright/chromium-1187/chrome-linux/chrome'});const p=await b.newPage();
let src=fs.readFileSync('index.html','utf8');
const a=src.indexOf('/* painel de variações'),z=src.indexOf('aplicar();})();',a)+'aplicar();})();'.length;src=src.slice(0,a)+src.slice(z);
const out=await p.evaluate(({src,c,h,s})=>{const d=new DOMParser().parseFromString('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>'+src+'</body></html>','text/html');
 for(const [k,n] of [['cab',c],['hero',h],['s2',s]]){[...d.querySelectorAll(`[data-var="${k}"]`)].forEach((el,i)=>{if(i+1!==n){el.remove();return}
  const f=document.createDocumentFragment ? null:null; el.replaceWith(...el.childNodes)})}
 d.querySelectorAll('.var,.var-aviso').forEach(e=>e.remove());
 d.querySelectorAll('[data-id-bairro]').forEach(e=>e.removeAttribute('data-id-bairro'));
 [...d.body.querySelectorAll(':scope > title, :scope > link, :scope > style')].forEach(e=>d.head.appendChild(e));
 return '<!doctype html>\n'+d.documentElement.outerHTML},{src,c,h,s});
fs.writeFileSync(process.argv[3]||'final.html',out);await b.close();console.log('ok',out.length)})();
