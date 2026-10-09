"""Página única do Trilho C com painel de variações (hero e seção 2).
Parte de c1..c4 (heros), t1/t2 (seções 2) e acrescenta 3 heros e 1 seção 2 novos."""
import pathlib, re
R = pathlib.Path(__file__).parent
ler = lambda f: (R / f).read_text()
ic = lambda n: f'<i data-lucide="{n}" aria-hidden="true"></i>'

def corta(html, ini, fim='<section id="bairro"'):
    i = html.index(ini); return html[i:html.index(fim, i)]

base = ler("c1.html")
HEROS = [("Lista", corta(base, '<section class="hero3 hl"')),
         ("Painel", corta(ler("c2.html"), '<section class="hero3 hp"')),
         ("Recorte", corta(ler("c3.html"), '<section class="hero3 hr"')),
         ("Linha do tempo", corta(ler("c4.html"), '<section class="hero3 tl"'))]
S2 = [("Manifesto", corta(base, '<section id="bairro" class="manif"', '<section id="infraestrutura"')),
      ("Fitas e números", corta(ler("t1.html"), '<div class="fitas"', '<section id="infraestrutura"')),
      ("Colagem", corta(ler("t2.html"), '<section id="bairro" class="colagem"', '<section id="infraestrutura"'))]

FORM = lambda: f'''<form class="hl-form" data-rapido novalidate><input aria-label="Nome" placeholder="Seu nome" required minlength="2" autocomplete="name">
  <input aria-label="WhatsApp" type="tel" placeholder="(00) 00000-0000" required minlength="14" autocomplete="tel"><button class="bt bt-areia" type="submit">Receber {ic("arrow-right")}</button></form>'''
FOTOS = [("portal", "Portal de entrada"), ("parque-aereo", "Parque linear"), ("ciclofaixa", "Ciclofaixa"), ("playground", "Playground infantil"), ("quadras-aereo", "Quadras de esporte")]

# ── hero 5 · Leque: cartas de foto em leque que giram sozinhas ──
HEROS.append(("Leque", f'''<section class="hero3 hk" data-hk>
  <div class="wrap hk-g"><div class="hk-txt"><p class="rot">Lançamento · Gravataí - RS</p><h1>Viva em harmonia <em>com o futuro.</em></h1>
  <p class="hk-sub">Conheça o Reserva do Parque, bairro planejado com infraestrutura completa e lazer para todas as idades.</p>{FORM()}</div>
  <div class="hk-leque" aria-roledescription="carrossel" aria-label="Fotos do bairro">{"".join(f'<figure class="hk-c" data-i="{i}"><img src="img/{im}-800.webp" alt="{t}" draggable="false"><figcaption>{t}</figcaption></figure>' for i, (im, t) in enumerate(FOTOS))}
  <div class="ctrl hk-ctrl"><button class="seta" type="button" data-dir="-1" aria-label="Foto anterior">{ic("arrow-left")}</button><span class="cont"></span><button class="seta" type="button" data-dir="1" aria-label="Próxima foto">{ic("arrow-right")}</button></div></div></div>
  <span class="selo-ref">Imagem de referência</span></section>'''))

# ── hero 6 · Colunas: fundo claro, duas colunas de fotos correndo em sentidos opostos ──
col = lambda l: "".join(f'<img src="img/{im}-800.webp" alt="" loading="lazy">' for im, _ in l * 2)
HEROS.append(("Colunas", f'''<section class="hc"><div class="wrap hc-g">
  <div class="hc-txt"><p class="rot">Lançamento · Gravataí - RS</p><h1>Viva em harmonia <em>com o futuro.</em></h1>
  <p class="hc-sub">Um bairro planejado em Gravataí com ruas prontas, ciclofaixa, praças e quadras. Deixe seu nome e WhatsApp para receber as condições de lançamento.</p>{FORM()}
  <ul class="hc-fatos"><li><strong>15</strong>itens de infraestrutura</li><li><strong>6</strong>espaços de lazer</li></ul></div>
  <div class="hc-cols" aria-hidden="true"><div class="hc-col"><div>{col(FOTOS[:3] + [("praca", "")])}</div></div><div class="hc-col sobe"><div>{col(FOTOS[2:] + [("petplace", ""), ("avenida", "")])}</div></div></div>
</div></section>'''))

# ── hero 7 · Casa: a foto aparece dentro da casa do logo e cresce até a tela inteira ──
HEROS.append(("Casa", f'''<section class="hm" data-casa><div class="hm-pin">
  <div class="hm-foto"><img src="img/entrada-aerea.webp" alt="Entrada do bairro vista do alto"></div>
  <div class="wrap hm-ini"><p class="rot">Lançamento · Gravataí - RS</p><h1>Um novo jeito de morar <em>em Gravataí.</em></h1></div>
  <p class="hm-dica" aria-hidden="true">Role para entrar ↓</p>
  <div class="wrap hm-fim"><p class="hm-h">Viva em harmonia <em>com o futuro.</em></p>{FORM()}</div>
  <span class="selo-ref">Imagem de referência</span></div></section>'''))

# ── seção 2 · Números em fotos: três cartões que abrem no hover ──
cards = [("15", "itens de infraestrutura", "Pavimentação, redes, iluminação em LED, câmeras e mais.", "corte"),
         ("6", "espaços de lazer", "Petplace, ciclofaixa, playground, pista cooper e quadras.", "playground"),
         ("RS", "Gravataí, Região Metropolitana", "Na região que mais cresce e se valoriza na cidade.", "localizacao")]
S2.append(("Números em fotos", f'''<section id="bairro" class="nf"><div class="wrap">
  <div class="nf-cab"><p class="rot">O bairro</p><h2 class="grande">O Reserva do Parque nasce em Gravataí com <strong>infraestrutura completa</strong> e <strong>lazer para todas as idades</strong>.</h2></div>
  <div class="nf-g">{"".join(f'<article class="nf-c{" on" if i == 0 else ""}" tabindex="0"><img src="img/{im}-800.webp" alt="" loading="lazy"><div><strong>{n}</strong><span>{t}</span><p>{d}</p></div></article>' for i, (n, t, d, im) in enumerate(cards))}</div>
</div></section>'''))


# ── seção 2 · três versões do bloco "O bairro" (frase + apoio + números) ──
FRASE = 'O Reserva do Parque nasce em Gravataí como um bairro planejado, com <strong>infraestrutura completa</strong> e <strong>lazer para todas as idades</strong> desde o primeiro dia.'
APOIO = 'A Nova Harmonia está comprometida em trazer um novo patamar de infraestrutura para a cidade. Um bairro completo para a sua família aproveitar áreas verdes, lazer e qualidade de vida, tudo perto de você.'
NUMS = [('<span class="conta" data-v="15">15</span>', "itens de infraestrutura entregues", "route"),
        ('<span class="conta" data-v="6">6</span>', "espaços de lazer para todas as idades", "trees"),
        ('<span class="pend">[PREENCHER]</span>', "lotes no lançamento", "map-pin")]
S2.append(("Centralizado", f'''<section id="bairro" class="b-centro"><img class="b-marca" src="img/simbolo-verde.png" alt="" aria-hidden="true"><div class="wrap">
  <p class="rot">O bairro</p><h2 class="b-frase">{FRASE}</h2><p class="b-apoio">{APOIO}</p>
  <ul class="b-cards">{"".join(f'<li>{ic(i)}<strong>{n}</strong><span>{t}</span></li>' for n, t, i in NUMS)}</ul></div></section>'''))
S2.append(("Foto com números", f'''<section id="bairro" class="b-foto"><div class="wrap b-foto-g">
  <div class="b-foto-txt"><p class="rot">O bairro</p><h2 class="b-frase">{FRASE}</h2><p class="b-apoio">{APOIO}</p><a class="bt bt-verde" href="#infraestrutura">Ver a infraestrutura {ic("arrow-right")}</a></div>
  <figure class="b-foto-im"><img src="img/praca.webp" alt="Praça com pergolado e bicicletário" loading="lazy"><span class="selo-ref">Imagem de referência</span>
  <dl class="b-foto-nums">{"".join(f'<div><dt>{t}</dt><dd>{n}</dd></div>' for n, t, i in NUMS)}</dl></figure></div></section>'''))
chip = lambda im, alt: f'<span class="b-chip"><img src="img/{im}-800.webp" alt="{alt}" loading="lazy"></span>'
S2.append(("Texto com fotos", f'''<section id="bairro" class="b-inline"><div class="wrap">
  <p class="rot">O bairro</p>
  <h2 class="b-frase-xl">O Reserva do Parque {chip("entrada-aerea", "Entrada do bairro")} nasce em Gravataí como um bairro planejado, com <strong>infraestrutura completa</strong> {chip("corte", "Corte da rua com as redes")} e <strong>lazer para todas as idades</strong> {chip("playground", "Playground")} desde o primeiro dia.</h2>
  <p class="b-apoio">{APOIO}</p></div>
  <div class="b-faixa"><div class="wrap"><ul>{"".join(f'<li><strong>{n}</strong><span>{t}</span></li>' for n, t, i in NUMS)}</ul></div></div></section>'''))

CSS_BAIRRO = r'''
/* o bairro · centralizado */
.b-centro{position:relative;padding-block:clamp(90px,12vw,170px);text-align:center;background:var(--papel);overflow:hidden}
.b-marca{position:absolute;left:50%;top:40px;transform:translateX(-50%);width:min(900px,90vw);opacity:.05;pointer-events:none}
.b-centro .wrap{position:relative;display:grid;justify-items:center;gap:22px}
.b-frase{font-size:clamp(1.6rem,2.8vw,2.7rem);line-height:1.18;font-weight:500;letter-spacing:-.03em;color:var(--verde-escuro);max-width:30ch}
.b-frase strong{font-weight:500;color:var(--verde)}
.b-apoio{color:var(--tinta-suave);font-size:18px;max-width:58ch}
.b-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;width:min(980px,100%);margin-top:24px}
.b-cards li{display:grid;justify-items:center;gap:8px;padding:28px 20px;border-radius:14px;background:#fff;border:1px solid var(--linha-escura);transition:transform .45s cubic-bezier(.2,.75,.15,1),box-shadow .45s}
.b-cards li:hover{transform:translateY(-6px);box-shadow:0 24px 50px rgba(23,47,27,.12)}
.b-cards svg{width:28px;height:28px;color:var(--verde)}
.b-cards strong{font-size:clamp(2.6rem,4.6vw,4rem);line-height:1;font-weight:600;letter-spacing:-.04em;color:var(--verde-escuro)}
.b-cards strong .pend{font-size:.38em;letter-spacing:0}
.b-cards span{color:var(--tinta-suave);max-width:22ch}
@media (max-width:700px){.b-cards{grid-template-columns:1fr}}
/* o bairro · foto com números */
.b-foto{padding-block:clamp(90px,12vw,160px)}
.b-foto-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(32px,6vw,96px);align-items:center}
.b-foto-txt{display:grid;gap:22px;justify-items:start}
.b-foto-im{position:relative;margin:0;border-radius:16px;overflow:hidden;aspect-ratio:4/5}
.b-foto-im>img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s cubic-bezier(.2,.75,.15,1)}
.b-foto-im:hover>img{transform:scale(1.04)}
.b-foto-im .selo-ref{left:auto;right:12px;top:12px;bottom:auto}
.b-foto-nums{position:absolute;left:16px;right:16px;bottom:16px;display:grid;grid-template-columns:repeat(3,1fr);background:var(--verde-escuro);color:var(--areia);border-radius:12px;overflow:hidden}
.b-foto-nums div{display:flex;flex-direction:column-reverse;gap:4px;padding:18px 16px;border-left:1px solid var(--linha-clara)}
.b-foto-nums div:first-child{border-left:0}
.b-foto-nums dd{margin:0;font-size:clamp(2rem,3.4vw,3rem);line-height:1;font-weight:600;letter-spacing:-.04em;color:#f3eee1}
.b-foto-nums dd .pend{font-size:.4em;letter-spacing:0;color:var(--ipe)}
.b-foto-nums dt{font-size:13px;opacity:.8;line-height:1.3}
@media (max-width:900px){.b-foto-g{grid-template-columns:1fr}.b-foto-im{aspect-ratio:4/5}}
@media (max-width:520px){.b-foto-nums{grid-template-columns:1fr}.b-foto-nums div{border-left:0;border-top:1px solid var(--linha-clara);flex-direction:row-reverse;justify-content:space-between;align-items:center}.b-foto-nums div:first-child{border-top:0}}
/* o bairro · texto com fotos */
.b-inline{padding-top:clamp(90px,12vw,160px)}
.b-inline .wrap{display:grid;gap:24px}
.b-frase-xl{font-size:clamp(1.9rem,4.2vw,4rem);line-height:1.15;font-weight:500;letter-spacing:-.04em;color:var(--verde-escuro);max-width:24ch}
.b-frase-xl strong{font-weight:500;color:var(--verde)}
.b-chip{display:inline-block;vertical-align:middle;width:1.9em;height:1.05em;border-radius:99px;overflow:hidden;margin:0 .08em;transform:translateY(-.06em);transition:width .6s cubic-bezier(.2,.75,.15,1);box-shadow:0 6px 18px rgba(23,47,27,.18)}
.b-chip:hover,.b-frase-xl:hover .b-chip:hover{width:3.4em}
.b-chip img{width:100%;height:100%;object-fit:cover}
.b-inline .b-apoio{max-width:60ch}
.b-faixa{margin-top:clamp(48px,7vw,96px);background:var(--verde-escuro);color:var(--areia)}
.b-faixa ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}
.b-faixa li{display:grid;gap:6px;padding:clamp(28px,4vw,48px) 24px clamp(28px,4vw,48px) 0;border-left:1px solid var(--linha-clara);padding-left:24px}
.b-faixa li:first-child{border-left:0;padding-left:0}
.b-faixa strong{font-size:clamp(2.6rem,5vw,4.4rem);line-height:1;font-weight:600;letter-spacing:-.04em;color:var(--ipe)}
.b-faixa strong .pend{font-size:.38em;letter-spacing:0;color:var(--areia)}
.b-faixa span{max-width:24ch;opacity:.85}
@media (max-width:700px){.b-faixa ul{grid-template-columns:1fr}.b-faixa li{border-left:0;padding-left:0;border-top:1px solid var(--linha-clara)}.b-faixa li:first-child{border-top:0}}
'''

CSS = r'''
/* ── hero 5 · leque ── */
.hk{background:var(--noite);align-items:center}
.hk::after{background:radial-gradient(80% 70% at 75% 50%,rgba(2,105,56,.35),transparent 70%)}
.hk-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(24px,5vw,72px);align-items:center;padding-block:120px 64px}
.hk-txt{display:grid;gap:18px}.hk-sub{color:rgba(255,255,255,.8);font-size:18px;max-width:42ch}
.hk-leque{position:relative;height:clamp(360px,42vw,560px);touch-action:pan-y;user-select:none}
.hk-c{position:absolute;left:50%;bottom:70px;width:min(420px,70%);aspect-ratio:4/5;margin:0 0 0 calc(min(420px,70%) / -2);border-radius:16px;overflow:hidden;border:5px solid #f3eee1;box-shadow:0 30px 60px rgba(0,0,0,.45);transform-origin:50% 120%;transition:transform .8s cubic-bezier(.3,1.2,.4,1),filter .6s;cursor:pointer}
.hk-c img{width:100%;height:100%;object-fit:cover;pointer-events:none}
.hk-c figcaption{position:absolute;left:12px;bottom:12px;background:var(--ipe);color:var(--verde-escuro);font-size:13px;font-weight:600;padding:6px 10px;border-radius:4px;opacity:0;transition:opacity .4s}
.hk-c.on figcaption{opacity:1}
.hk-ctrl{position:absolute;left:0;right:0;bottom:0;justify-content:center;color:#fff}
.hk .seta:hover{background:var(--areia);color:var(--verde-escuro);border-color:var(--areia)}
.hk>.selo-ref{left:auto;right:var(--gutter);top:84px;bottom:auto}
@media (max-width:900px){.hk-g{grid-template-columns:1fr}.hk-leque{order:-1;height:380px}}
/* ── hero 6 · colunas ── */
.hc{background:#fff;overflow:hidden}
.hc-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,5vw,72px);align-items:center;min-height:min(100svh,920px)}
.hc-txt{display:grid;gap:18px;padding-block:120px 48px}
.hc h1{font-weight:600;letter-spacing:-.045em;font-size:clamp(2.6rem,5.6vw,5.4rem);line-height:.96;color:var(--verde-escuro)}
.hc h1 em{font-style:normal;color:var(--verde)}
.hc-sub{color:var(--tinta-suave);font-size:18px;max-width:44ch}
.hc .hl-form input{color:var(--tinta);background:var(--papel);border-color:var(--linha-escura)}
.hc .hl-form input::placeholder{color:#7a7f78}
.hc .hl-form .bt-areia{background:var(--verde-escuro);color:var(--areia)}
.hc-fatos{display:flex;gap:28px;border-top:1px solid var(--linha-escura);padding-top:16px}
.hc-fatos li{font-size:14px;color:var(--tinta-suave);max-width:14ch}.hc-fatos strong{display:block;font-size:2.2rem;line-height:1;font-weight:600;letter-spacing:-.04em;color:var(--verde)}
.hc-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px;height:min(100svh,920px);-webkit-mask-image:linear-gradient(transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(transparent,#000 12%,#000 88%,transparent)}
.hc-col{overflow:hidden}
.hc-col>div{display:grid;gap:14px;animation:hc-desce 40s linear infinite}
.hc-col.sobe>div{animation-direction:reverse;animation-duration:46s}
.hc-cols:hover .hc-col>div{animation-play-state:paused}
.hc-col img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:12px}
@keyframes hc-desce{to{transform:translateY(-50%)}}
@media (max-width:900px){.hc-g{grid-template-columns:1fr}.hc-cols{height:420px;order:-1;margin-top:80px}.hc-txt{padding-top:20px}}
/* ── hero 7 · casa ── */
.hm{height:230vh;background:var(--papel)}
.hm-pin{position:sticky;top:0;height:100svh;overflow:hidden}
.hm-foto{position:absolute;inset:0;-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0 44 L50 4 L100 44 V100 H0Z'/%3E%3C/svg%3E") center 62%/var(--m,34vmin) no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0 44 L50 4 L100 44 V100 H0Z'/%3E%3C/svg%3E") center 62%/var(--m,34vmin) no-repeat}
.hm-foto img{width:100%;height:100%;object-fit:cover;transform:scale(var(--z,1.2))}
.hm-foto::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(15,31,18,.85));opacity:var(--ov,0)}
.hm-ini{position:absolute;inset:110px 0 auto;text-align:center;display:grid;justify-items:center;gap:14px}
.hm-ini h1{font-weight:600;letter-spacing:-.04em;font-size:clamp(2.2rem,4.4vw,4.4rem);line-height:1.02;color:var(--verde-escuro);max-width:16ch}
.hm-ini h1 em{font-style:normal;color:var(--verde)}
.hm-dica{position:absolute;left:50%;bottom:3%;transform:translateX(-50%);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--verde-escuro)}
.hm-fim{position:absolute;left:0;right:0;bottom:48px;display:grid;gap:20px;justify-items:start;color:#fff;opacity:0;pointer-events:none}
.hm-fim.on{pointer-events:auto}
.hm-h{font-weight:600;letter-spacing:-.04em;font-size:clamp(2.4rem,5vw,4.6rem);line-height:1;max-width:14ch}
.hm-h em{font-style:normal;color:var(--areia)}
.hm-fim .hl-form{max-width:640px}
.hm .selo-ref{opacity:var(--ov,0)}
/* ── seção 2 · números em fotos ── */
.nf{padding-block:clamp(80px,10vw,140px)}
.nf-cab{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2.4fr);gap:40px;margin-bottom:clamp(32px,4vw,56px)}
.nf .grande{font-size:clamp(1.45rem,2.5vw,2.4rem);line-height:1.22;font-weight:500;letter-spacing:-.025em;color:var(--verde-escuro)}
.nf .grande strong{font-weight:500;color:var(--verde)}
.nf-g{display:flex;gap:14px;height:clamp(380px,40vw,520px)}
.nf-c{position:relative;flex:1;min-width:0;border-radius:14px;overflow:hidden;color:#fff;cursor:pointer;transition:flex .9s cubic-bezier(.2,.75,.15,1);isolation:isolate;outline-offset:3px}
.nf-c.on{flex:2.2}
.nf-c img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transition:transform 1.2s cubic-bezier(.2,.75,.15,1)}
.nf-c.on img{transform:scale(1.05)}
.nf-c::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(15,31,18,.2),rgba(15,31,18,.88))}
.nf-c div{position:absolute;left:clamp(18px,2.4vw,30px);right:clamp(18px,2.4vw,30px);bottom:clamp(18px,2.4vw,30px);display:grid;gap:6px}
.nf-c strong{font-size:clamp(3rem,6vw,5.4rem);font-weight:600;letter-spacing:-.05em;line-height:.9;color:var(--areia)}
.nf-c span{font-weight:600;font-size:1.1rem}
.nf-c p{max-width:34ch;opacity:0;max-height:0;overflow:hidden;transition:opacity .5s,max-height .6s}
.nf-c.on p{opacity:.85;max-height:80px}
@media (max-width:800px){.nf-cab{grid-template-columns:1fr;gap:16px}.nf-g{flex-direction:column;height:auto}.nf-c{flex:none;height:150px}.nf-c.on{height:300px}}
/* ── painel de variações ── */
.var{position:fixed;z-index:45;left:50%;top:calc(78px + env(safe-area-inset-top,0px));transform:translateX(-50%);display:flex;align-items:center;gap:6px;padding:6px;border-radius:14px;background:rgba(15,31,18,.94);backdrop-filter:blur(10px);color:var(--areia);box-shadow:0 18px 50px rgba(0,0,0,.35);font-size:14px;max-width:calc(100% - 24px)}
.var-g{position:relative;display:flex;align-items:center;gap:2px;padding-left:10px;border-radius:10px;background:rgba(215,203,174,.08)}
.var-g>small{white-space:nowrap;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--ipe);font-weight:700;margin-right:4px}
.var button{color:inherit;cursor:pointer;border-radius:8px;transition:background .2s}
.var button:hover{background:rgba(215,203,174,.14)}
.var-seta{width:34px;height:38px;display:grid;place-items:center}.var-seta svg{width:16px;height:16px}
.var-nome{height:38px;padding:0 10px;font-weight:600;color:#fff;white-space:nowrap;display:inline-flex;align-items:center;gap:6px}
.var-nome svg{width:14px;height:14px;opacity:.7}
.var-lista{position:absolute;left:0;top:calc(100% + 10px);min-width:240px;background:var(--noite);border:1px solid var(--linha-clara);border-radius:12px;padding:6px;box-shadow:0 18px 50px rgba(0,0,0,.4);display:grid}
.var-lista button{text-align:left;padding:10px 12px;display:flex;gap:10px;align-items:baseline}
.var-lista button b{font-size:12px;color:var(--ipe);font-variant-numeric:tabular-nums}
.var-lista button[aria-current=true]{background:var(--ipe);color:var(--verde-escuro)}.var-lista button[aria-current=true] b{color:var(--verde-escuro)}
.var-lista a{display:block;padding:10px 12px;border-radius:8px;text-decoration:none;color:inherit}.var-lista a:hover{background:rgba(215,203,174,.14)}
.var-lista small{display:block;padding:8px 12px 4px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--ipe);font-weight:700}
.var-mais{height:38px;padding:0 12px;display:inline-flex;align-items:center;gap:6px;position:relative}
.var-mais svg{width:16px;height:16px}
.var-min{width:34px;height:38px;display:grid;place-items:center}.var-min svg{width:16px;height:16px}
.var.min .var-g,.var.min .var-mais-w{display:none}
.var-aviso{position:fixed;z-index:66;left:50%;top:136px;transform:translate(-50%,-10px);background:var(--ipe);color:var(--verde-escuro);font-weight:600;font-size:14px;padding:10px 16px;border-radius:99px;opacity:0;pointer-events:none;transition:opacity .3s,transform .3s}
.var-aviso.on{opacity:1;transform:translate(-50%,0)}
@media (max-width:760px){.var{top:calc(74px + env(safe-area-inset-top,0px));gap:4px;padding:5px;font-size:13px}.var-g>small{display:none}.var-g{padding-left:2px}.var-nome{padding:0 4px;max-width:23vw;overflow:hidden;text-overflow:ellipsis}.var-nome svg{display:none}.var-mais span{display:none}.var-seta{display:none}.var-g{position:static;padding-left:0}.var-nome{max-width:26vw}.var-mais{padding:0 8px}.var-min{display:none}.var-mais-w{position:static!important}.var-lista{left:6px!important;right:6px!important;min-width:0}}
'''

JS = r'''<script>
lucide.createIcons();
/* hero 5 · leque */
document.querySelectorAll("[data-hk]").forEach(s=>{const cs=[...s.querySelectorAll(".hk-c")],N=cs.length,cont=s.querySelector(".cont"),lq=s.querySelector(".hk-leque");let at=0,pausa=false,x0=null;
 const ir=i=>{at=(i+N)%N;cs.forEach((c,j)=>{let o=j-at;if(o>N/2)o-=N;if(o<-N/2)o+=N;const a=Math.abs(o);c.classList.toggle("on",!o);c.style.zIndex=10-a;
  c.style.transform=`translateX(${o*24}%) rotate(${o*9}deg) scale(${1-a*.07})`;c.style.filter=o?"brightness(.6)":"none"});cont.textContent=String(at+1).padStart(2,"0")+" / "+String(N).padStart(2,"0")};
 cs.forEach(c=>c.addEventListener("click",()=>ir(+c.dataset.i)));s.querySelectorAll(".seta").forEach(b=>b.addEventListener("click",()=>ir(at+ +b.dataset.dir)));
 lq.addEventListener("pointerdown",e=>x0=e.clientX);lq.addEventListener("pointerup",e=>{if(x0!==null&&Math.abs(e.clientX-x0)>50)ir(at+(e.clientX<x0?1:-1));x0=null});
 s.addEventListener("mouseenter",()=>pausa=true);s.addEventListener("mouseleave",()=>pausa=false);ir(0);
 if(!RP.reduz)setInterval(()=>{if(!pausa&&!s.closest("[hidden]"))ir(at+1)},4200)});
/* hero 7 · casa */
document.querySelectorAll("[data-casa]").forEach(s=>{const f=s.querySelector(".hm-foto"),ini=s.querySelector(".hm-ini"),fim=s.querySelector(".hm-fim"),dica=s.querySelector(".hm-dica"),raiz=document.documentElement;
 const q=()=>{if(s.closest("[hidden]"))return;const r=s.getBoundingClientRect(),p=RP.clamp(-r.top/(r.height-innerHeight)),k=RP.suave(RP.clamp(p/.75));
  s.style.setProperty("--m",(34+k*330)+"vmax");s.style.setProperty("--z",1.2-.2*k);s.style.setProperty("--ov",RP.clamp((p-.45)/.3));
  ini.style.opacity=1-RP.clamp(p*3);ini.style.transform=`translateY(${-p*60}px)`;dica.style.opacity=1-RP.clamp(p*5);
  const e=RP.clamp((p-.6)/.25);fim.style.opacity=e;fim.style.transform=`translateY(${(1-e)*30}px)`;fim.classList.toggle("on",e>.5);
  if(p>.5)raiz.dataset.heroEscuro="";else if(r.top>-10||p<.5)delete raiz.dataset.heroEscuro};
 s.style.setProperty("--m","34vmax");q();addEventListener("scroll",q,{passive:true});addEventListener("resize",q);s.addEventListener("variacao",q)});
/* seção 2 · números em fotos */
document.querySelectorAll(".nf-g").forEach(g=>{const cs=[...g.children];cs.forEach(c=>["mouseenter","focus","click"].forEach(ev=>c.addEventListener(ev,()=>cs.forEach(x=>x.classList.toggle("on",x===c)))))});

/* painel de variações: troca hero e seção 2 na mesma página; o link guarda a combinação (#h3-s2) */
(function(){const grupos={c:[...document.querySelectorAll('[data-var="cab"]')],h:[...document.querySelectorAll('[data-var="hero"]')],s:[...document.querySelectorAll('[data-var="s2"]')]};
 const painel=document.querySelector(".var"),aviso=document.querySelector(".var-aviso");let sel={c:1,h:1,s:1};
 try{const m=location.hash.match(/^#(?:c(\d+)-)?h(\d+)-s(\d+)$/);if(m)sel={c:+(m[1]||1),h:+m[2],s:+m[3]};else{const g=JSON.parse(localStorage.getItem("rp-var")||"null");if(g)sel=g}}catch(e){}
 const avisar=t=>{aviso.textContent=t;aviso.classList.add("on");clearTimeout(avisar.t);avisar.t=setTimeout(()=>aviso.classList.remove("on"),1600)};
 const aplicar=(rolar)=>{for(const k of ["c","h","s"]){const arr=grupos[k];sel[k]=Math.min(Math.max(1,sel[k]),arr.length);
   arr.forEach((el,i)=>{const on=i+1===sel[k];el.hidden=!on;el.querySelectorAll("[data-id-bairro]").forEach(x=>{if(on)x.id="bairro";else x.removeAttribute("id")});if(on)el.querySelectorAll("section").forEach(x=>x.dispatchEvent(new Event("variacao")))});
   const g=painel.querySelector(`[data-g="${k}"]`);g.querySelector(".var-nome span").textContent=String(sel[k]).padStart(2,"0")+" · "+arr[sel[k]-1].dataset.nome;
   g.querySelectorAll(".var-lista button").forEach((b,i)=>b.setAttribute("aria-current",i+1===sel[k]))}
  delete document.documentElement.dataset.heroEscuro;document.getElementById("menu-tela")&&(document.getElementById("menu-tela").hidden=true,document.body.style.overflow="");dispatchEvent(new Event("scroll"));document.dispatchEvent(new Event("variacao-cab"));dispatchEvent(new Event("resize"));
  try{history.replaceState(null,"",`#c${sel.c}-h${sel.h}-s${sel.s}`);localStorage.setItem("rp-var",JSON.stringify(sel))}catch(e){}
  if(rolar==="h")scrollTo({top:0,behavior:"instant"});if(rolar==="s")document.getElementById("bairro").scrollIntoView({behavior:"instant"})};
 const fecharListas=()=>painel.querySelectorAll(".var-lista").forEach(l=>l.hidden=true);
 painel.querySelectorAll("[data-g]").forEach(g=>{const k=g.dataset.g,lista=g.querySelector(".var-lista");
  g.querySelectorAll(".var-seta").forEach(b=>b.addEventListener("click",()=>{const n=grupos[k].length;sel[k]=(sel[k]-1+ +b.dataset.dir+n)%n+1;fecharListas();aplicar(k);avisar(({c:"Header ",h:"Hero ",s:"Seção 2 "})[k]+String(sel[k]).padStart(2,"0")+" · "+grupos[k][sel[k]-1].dataset.nome)}));
  g.querySelector(".var-nome").addEventListener("click",e=>{e.stopPropagation();const ab=lista.hidden;fecharListas();lista.hidden=!ab});
  lista.querySelectorAll("button").forEach((b,i)=>b.addEventListener("click",()=>{sel[k]=i+1;fecharListas();aplicar(k)}))});
 const mais=painel.querySelector(".var-mais"),ml=painel.querySelector(".var-mais-w .var-lista");mais.addEventListener("click",e=>{e.stopPropagation();const ab=ml.hidden;fecharListas();ml.hidden=!ab});
 painel.querySelector(".var-min").addEventListener("click",()=>{painel.classList.toggle("min");painel.querySelector(".var-min").innerHTML=painel.classList.contains("min")?'<i data-lucide="sliders-horizontal"></i>':'<i data-lucide="minus"></i>';lucide.createIcons()});
 addEventListener("click",e=>{if(!e.target.closest(".var"))fecharListas()});addEventListener("keydown",e=>{if(e.key==="Escape")fecharListas()});
 addEventListener("hashchange",()=>{const m=location.hash.match(/^#(?:c(\d+)-)?h(\d+)-s(\d+)$/);if(m){sel={c:+(m[1]||1),h:+m[2],s:+m[3]};aplicar("h")}});
 aplicar();})();
</script>'''

def painel():
    def grupo(k, rotulo, itens):
        lis = "".join(f'<button type="button"><b>{i+1:02d}</b>{n}</button>' for i, (n, _) in enumerate(itens))
        return f'''<div class="var-g" data-g="{k}"><small>{rotulo}</small><button class="var-seta" type="button" data-dir="-1" aria-label="{rotulo} anterior">{ic("chevron-left")}</button>
  <button class="var-nome" type="button" aria-label="Escolher {rotulo.lower()}"><span></span>{ic("chevron-down")}</button><button class="var-seta" type="button" data-dir="1" aria-label="Próximo {rotulo.lower()}">{ic("chevron-right")}</button>
  <div class="var-lista" hidden>{lis}</div></div>'''
    outras = [("t1.html", "Trilho A · Tela cheia"), ("t2.html", "Trilho B · Janela"), ("a.html", "01 · Mosaico"), ("b.html", "02 · Painéis")]
    return f'''<div class="var" role="toolbar" aria-label="Variações do protótipo">{grupo("c", "Header", [(n, None) for n in ["Menu em tela cheia", "Clássico", "Pílula", "Duas linhas", "Ilha da seção", "Logo central"]])}{grupo("h", "Hero", HEROS)}{grupo("s", "Seção 2", S2)}
  <div class="var-mais-w" style="position:relative"><button class="var-mais" type="button">{ic("layers")}<span>Outras</span></button><div class="var-lista" hidden style="left:auto;right:0"><small>Outros protótipos</small>{"".join(f'<a href="{h}">{n}</a>' for h, n in outras)}</div></div>
  <button class="var-min" type="button" aria-label="Recolher painel">{ic("minus")}</button></div><div class="var-aviso" role="status"></div>'''

# ═══════════ depois da fita: 5 propostas novas ═══════════
FRASE2 = 'O Reserva do Parque nasce em Gravataí como um bairro planejado, com <strong>infraestrutura completa</strong> e <strong>lazer para todas as idades</strong> desde o primeiro dia.'
APOIO2 = 'A Nova Harmonia está comprometida em trazer um novo patamar de infraestrutura para a cidade. Um bairro completo para a sua família aproveitar áreas verdes, lazer e qualidade de vida, tudo perto de você.'
NUM3 = '<ul class="nums3"><li><strong><span class="conta" data-v="15">15</span></strong><span>itens de infraestrutura entregues</span></li><li><strong><span class="conta" data-v="6">6</span></strong><span>espaços de lazer para todas as idades</span></li><li><strong><span class="pend">[PREENCHER]</span></strong><span>lotes no lançamento</span></li></ul>'
NOVOS = []
NOVOS.append(("Antes e depois", f'''<section id="bairro" class="ad" data-ad><div class="wrap">
  <div class="ad-cab"><div><p class="rot">O bairro</p><h2 class="b-frase">{FRASE2}</h2></div><p class="b-apoio">{APOIO2}</p></div>
  <div class="ad-quadro"><img src="img/entrada-aerea.webp" alt="O bairro pronto visto do alto" loading="lazy">
  <div class="ad-plano"><img src="img/implantacao.webp" alt="Projeto do bairro: ruas, quadras e lotes" loading="lazy"></div>
  <span class="ad-et ad-et-a">Projeto</span><span class="ad-et ad-et-b">Bairro pronto</span>
  <span class="ad-linha" aria-hidden="true"><i>{ic("chevrons-left-right")}</i></span>
  <input class="ad-range" type="range" min="0" max="100" value="50" aria-label="Comparar o projeto com o bairro pronto">
  <span class="selo-ref">Imagens de referência</span></div>{NUM3}</div></section>'''))
NOVOS.append(("Bento", f'''<section id="bairro" class="bento"><div class="wrap bento-g">
  <div class="bt-frase"><p class="rot">O bairro</p><h2>{FRASE2}</h2></div>
  <figure class="bt-f bt-f1"><img src="img/parque-aereo-800.webp" alt="Parque linear visto do alto" loading="lazy"><figcaption>Parque linear</figcaption></figure>
  <div class="bt-n bt-ipe"><strong><span class="conta" data-v="15">15</span></strong><span>itens de infraestrutura entregues</span></div>
  <div class="bt-n bt-areia"><strong><span class="conta" data-v="6">6</span></strong><span>espaços de lazer para todas as idades</span></div>
  <figure class="bt-f bt-f2"><img src="img/playground-800.webp" alt="Playground infantil" loading="lazy"><figcaption>Playground infantil</figcaption></figure>
  <div class="bt-apoio"><p>{APOIO2}</p><a class="bt bt-verde" href="#infraestrutura">Ver a infraestrutura {ic("arrow-right")}</a></div>
  <div class="bt-n bt-linha"><strong><span class="pend">[PREENCHER]</span></strong><span>lotes no lançamento</span></div>
  <figure class="bt-f bt-f3"><img src="img/localizacao.webp" alt="Vista aérea da região" loading="lazy"><figcaption>{ic("map-pin")} Gravataí · RS</figcaption></figure>
</div></section>'''))
NOVOS.append(("Números gigantes", f'''<section id="bairro" class="ng" data-ng><div class="wrap">
  <div class="ng-cab"><p class="rot">O bairro</p><h2>{FRASE2}</h2></div>
  <ul class="ng-lista"><li><strong data-fill>15</strong><span><b>itens de infraestrutura</b>Pavimentação em CBUQ, redes de água, esgoto, drenagem e elétrica, LED, câmeras e mais.</span></li>
  <li><strong data-fill>6</strong><span><b>espaços de lazer</b>Petplace, ciclofaixa, playground, pista cooper, quadra de areia e poliesportiva.</span></li>
  <li><strong data-fill class="ng-p">[PREENCHER]</strong><span><b>lotes no lançamento</b>Quantidade a confirmar com o cliente.</span></li></ul></div></section>'''))
ORB_EXT = ["route", "ruler", "droplet", "waves", "traffic-cone", "cloud-rain", "zap", "lightbulb", "cctv"]
ORB_INT = ["paw-print", "bike", "blocks", "footprints", "volleyball", "goal"]
NOMES_EXT = ["Pavimentação em CBUQ", "Meio-fio com sarjeta", "Rede de água", "Rede de esgoto", "Sinalização de trânsito", "Drenagem pluvial", "Rede elétrica", "Iluminação em LED", "Câmeras"]
NOMES_INT = ["Petplace", "Ciclofaixa", "Playground", "Pista cooper", "Quadra de areia", "Poliesportiva"]
orb = lambda icons, nomes, cls: "".join(f'<li class="{cls}" style="--i:{k};--n:{len(icons)}"><span title="{nomes[k]}">{ic(n)}<em>{nomes[k]}</em></span></li>' for k, n in enumerate(icons))
NOVOS.append(("Órbita", f'''<section id="bairro" class="orb-sec"><div class="wrap orb-g">
  <div class="orb-txt"><p class="rot">O bairro</p><h2 class="b-frase">{FRASE2}</h2><p class="b-apoio">{APOIO2}</p>
  <ul class="orb-leg"><li><i class="o1"></i>15 itens de infraestrutura</li><li><i class="o2"></i>6 espaços de lazer</li></ul></div>
  <div class="orb" aria-label="Itens de infraestrutura e lazer do bairro"><img class="orb-logo" src="img/simbolo-verde.png" alt="Reserva do Parque">
  <ul class="orb-ext">{orb(ORB_EXT, NOMES_EXT, "oe")}</ul><ul class="orb-int">{orb(ORB_INT, NOMES_INT, "oi")}</ul></div>
</div></section>'''))
NOVOS.append(("Split preso", f'''<section id="bairro" class="sp"><div class="wrap sp-g">
  <div class="sp-fixo"><p class="rot">O bairro</p><h2 class="b-frase">{FRASE2}</h2><p class="b-apoio">{APOIO2}</p><a class="bt bt-verde" href="#cadastro">Receber a tabela {ic("arrow-right")}</a></div>
  <div class="sp-cards">
   <article class="sp-c"><img src="img/corte-800.webp" alt="" loading="lazy"><div><strong><span class="conta" data-v="15">15</span></strong><h3>itens de infraestrutura</h3><p>Ruas, redes, iluminação e segurança entregues antes da primeira casa.</p></div></article>
   <article class="sp-c"><img src="img/playground-800.webp" alt="" loading="lazy"><div><strong><span class="conta" data-v="6">6</span></strong><h3>espaços de lazer</h3><p>Petplace, ciclofaixa, playground, pista cooper e quadras.</p></div></article>
   <article class="sp-c"><img src="img/localizacao-800.webp" alt="" loading="lazy"><div><strong>RS</strong><h3>Gravataí, Região Metropolitana</h3><p>Na região que mais cresce e se valoriza na cidade.</p></div></article>
  </div></div></section>'''))

CSS2 = r"""
/* comuns */
.b-frase{font-size:clamp(1.6rem,2.8vw,2.7rem);line-height:1.18;font-weight:500;letter-spacing:-.03em;color:var(--verde-escuro)}
.b-frase strong{font-weight:500;color:var(--verde)}
.b-apoio{color:var(--tinta-suave);font-size:18px;max-width:56ch}
.nums3 strong .pend{font-size:.32em;letter-spacing:0;vertical-align:middle}
/* antes e depois */
.ad{padding-block:clamp(70px,9vw,130px)}
.ad-cab{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:clamp(24px,5vw,72px);align-items:end;margin-bottom:clamp(28px,4vw,48px)}
.ad-cab .b-frase{margin-top:14px}
.ad-quadro{position:relative;aspect-ratio:2/1;border-radius:16px;overflow:hidden;--x:50%;user-select:none}
.ad-quadro>img,.ad-plano img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ad-plano{position:absolute;inset:0;clip-path:inset(0 calc(100% - var(--x)) 0 0);background:#e9efe0}
.ad-plano img{object-fit:contain;background:#eef2e6}
.ad-linha{position:absolute;top:0;bottom:0;left:var(--x);width:3px;margin-left:-1.5px;background:#fff;pointer-events:none;box-shadow:0 0 20px rgba(0,0,0,.25)}
.ad-linha i{position:absolute;top:50%;left:50%;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;background:var(--ipe);color:var(--verde-escuro);display:grid;place-items:center;box-shadow:0 8px 24px rgba(0,0,0,.3)}
.ad-linha svg{width:22px;height:22px}
.ad-range{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0}
.ad-range:focus-visible+.selo-ref,.ad-quadro:focus-within{outline:3px solid var(--ipe);outline-offset:3px}
.ad-et{position:absolute;top:16px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:7px 12px;border-radius:99px;pointer-events:none}
.ad-et-a{left:16px;background:var(--verde-escuro);color:var(--areia)}.ad-et-b{right:16px;background:#fff;color:var(--verde-escuro)}
.ad .selo-ref{left:auto;right:16px;bottom:16px}
@media (max-width:800px){.ad-cab{grid-template-columns:1fr}.ad-quadro{aspect-ratio:4/3}}
/* bento */
.bento{padding-block:clamp(70px,9vw,130px)}
.bento-g{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(170px,auto);gap:14px}
.bento-g>*{border-radius:16px;overflow:hidden;position:relative;transition:transform .45s cubic-bezier(.2,.75,.15,1),box-shadow .45s}
.bento-g>*:hover{transform:translateY(-4px);box-shadow:0 24px 50px rgba(23,47,27,.14)}
.bt-frase{grid-column:span 2;grid-row:span 2;background:var(--verde-escuro);color:var(--areia);padding:clamp(24px,3vw,40px);display:grid;align-content:space-between;gap:24px}
.bt-frase .rot{color:var(--ipe)}
.bt-frase h2{font-size:clamp(1.5rem,2.5vw,2.4rem);line-height:1.18;font-weight:500;letter-spacing:-.03em;color:#f3eee1}
.bt-frase strong{font-weight:500;color:var(--ipe)}
.bt-f{margin:0}.bt-f img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.75,.15,1)}
.bt-f:hover img{transform:scale(1.07)}
.bt-f figcaption{position:absolute;left:12px;bottom:12px;display:inline-flex;gap:6px;align-items:center;background:#fff;color:var(--verde-escuro);font-size:13px;font-weight:600;padding:6px 10px;border-radius:6px}
.bt-f figcaption svg{width:14px;height:14px;color:var(--verde)}
.bt-f1{grid-column:span 2}.bt-f3{grid-column:1/-1;min-height:clamp(220px,26vw,340px)}
.bt-n{padding:22px;display:grid;align-content:space-between;gap:12px}
.bt-n strong{font-size:clamp(3rem,5vw,4.6rem);line-height:.9;font-weight:600;letter-spacing:-.05em}
.bt-n strong .pend{font-size:.3em;letter-spacing:0}
.bt-ipe{background:var(--ipe);color:var(--verde-escuro)}.bt-areia{background:var(--areia);color:var(--verde-escuro)}.bt-linha{border:1px solid var(--linha-escura);color:var(--verde-escuro)}
.bt-apoio{grid-column:span 2;background:var(--papel);padding:clamp(22px,3vw,32px);display:grid;align-content:space-between;justify-items:start;gap:18px;color:var(--tinta-suave)}
@media (max-width:900px){.bento-g{grid-template-columns:repeat(2,minmax(0,1fr))}.bt-frase,.bt-f1,.bt-f3,.bt-apoio{grid-column:span 2}.bt-frase{grid-row:auto}}
/* números gigantes */
.ng{background:var(--verde-escuro);color:var(--areia);padding-block:clamp(80px,10vw,140px);overflow:hidden}
.ng-cab{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2.4fr);gap:40px;margin-bottom:clamp(32px,5vw,64px)}
.ng .rot{color:var(--ipe)}
.ng-cab h2{font-size:clamp(1.4rem,2.4vw,2.3rem);line-height:1.22;font-weight:500;letter-spacing:-.025em;color:#f3eee1}
.ng-cab h2 strong{font-weight:500;color:var(--ipe)}
.ng-lista li{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:clamp(20px,4vw,56px);align-items:center;border-top:1px solid var(--linha-clara);padding-block:clamp(10px,2vw,24px)}
.ng-lista li:last-child{border-bottom:1px solid var(--linha-clara)}
.ng-lista strong{font-size:clamp(7rem,22vw,20rem);line-height:.86;font-weight:700;letter-spacing:-.07em;color:transparent;-webkit-text-stroke:2px rgba(215,203,174,.55);background:linear-gradient(0deg,var(--ipe) var(--f,0%),transparent var(--f,0%));-webkit-background-clip:text;background-clip:text}
.ng-lista strong.ng-p{font-size:clamp(2.4rem,7vw,6rem);letter-spacing:-.04em}
.ng-lista span{display:grid;gap:6px;opacity:.8;max-width:38ch}
.ng-lista b{font-size:clamp(1.3rem,2.2vw,2rem);font-weight:600;letter-spacing:-.03em;color:#fff;opacity:1}
@media (max-width:800px){.ng-cab,.ng-lista li{grid-template-columns:1fr}}
/* órbita */
.orb-sec{padding-block:clamp(80px,10vw,140px);background:var(--papel);overflow:hidden}
.orb-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(32px,6vw,96px);align-items:center}
.orb-txt{display:grid;gap:22px}
.orb-leg{display:flex;gap:22px;flex-wrap:wrap;font-weight:600;color:var(--verde-escuro)}
.orb-leg li{display:flex;gap:8px;align-items:center}.orb-leg i{width:14px;height:14px;border-radius:50%}
.orb-leg .o1{background:var(--verde-escuro)}.orb-leg .o2{background:var(--ipe)}
.orb{position:relative;width:min(560px,100%);aspect-ratio:1;margin-inline:auto;container-type:inline-size}
.orb::before,.orb::after{content:"";position:absolute;border-radius:50%;border:1px dashed rgba(23,47,27,.22)}
.orb::before{inset:6%}.orb::after{inset:27%}
.orb-logo{position:absolute;left:50%;top:50%;width:30%;transform:translate(-50%,-50%)}
.orb ul{position:absolute;inset:0;animation:gira 60s linear infinite}
.orb .orb-int{animation-direction:reverse;animation-duration:45s}
.orb:hover ul,.orb:focus-within ul{animation-play-state:paused}
@keyframes gira{to{transform:rotate(360deg)}}
.orb li{position:absolute;left:50%;top:50%;--r:44cqw;transform:rotate(calc(var(--i) * 360deg / var(--n))) translate(0,calc(var(--r) * -1)) rotate(calc(var(--i) * -360deg / var(--n)))}
.orb .oi{--r:23cqw}
.orb li span{position:relative;display:grid;place-items:center;width:58px;height:58px;margin:-29px 0 0 -29px;border-radius:50%;background:var(--verde-escuro);color:var(--ipe);box-shadow:0 10px 24px rgba(23,47,27,.25);animation:gira 60s linear infinite reverse;cursor:default}
.orb .oi span{background:var(--ipe);color:var(--verde-escuro);width:50px;height:50px;margin:-25px 0 0 -25px;animation-duration:45s;animation-direction:normal}
.orb:hover li span{animation-play-state:paused}
.orb li svg{width:24px;height:24px}
.orb li em{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);white-space:nowrap;font-style:normal;font-size:12px;font-weight:600;background:#fff;color:var(--verde-escuro);padding:5px 9px;border-radius:6px;box-shadow:0 6px 16px rgba(0,0,0,.12);opacity:0;pointer-events:none;transition:opacity .2s}
.orb li span:hover em{opacity:1}
@media (max-width:900px){.orb-g{grid-template-columns:1fr}.orb li span{width:44px;height:44px;margin:-22px 0 0 -22px}.orb .oi span{width:40px;height:40px;margin:-20px 0 0 -20px}.orb li svg{width:18px;height:18px}}
/* split preso */
.sp{padding-block:clamp(80px,10vw,140px)}
.sp-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(32px,6vw,96px);align-items:start}
.sp-fixo{position:sticky;top:120px;display:grid;gap:22px;justify-items:start}
.sp-cards{display:grid;gap:clamp(20px,3vw,32px)}
.sp-c{position:relative;border-radius:16px;overflow:hidden;min-height:clamp(320px,38vw,460px);display:grid;align-content:end;color:#fff;isolation:isolate}
.sp-c img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transition:transform 1.2s cubic-bezier(.2,.75,.15,1)}
.sp-c:hover img{transform:scale(1.05)}
.sp-c::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,transparent 30%,rgba(15,31,18,.9))}
.sp-c div{padding:clamp(22px,3vw,34px);display:grid;gap:6px}
.sp-c strong{font-size:clamp(3.4rem,7vw,6rem);line-height:.9;font-weight:600;letter-spacing:-.05em;color:var(--ipe)}
.sp-c h3{font-size:clamp(1.3rem,2vw,1.8rem);font-weight:600;letter-spacing:-.03em}
.sp-c p{opacity:.85;max-width:40ch}
@media (max-width:900px){.sp-g{grid-template-columns:1fr}.sp-fixo{position:static}}
"""
JS2 = r"""<script>
document.querySelectorAll("[data-ad]").forEach(s=>{const q=s.querySelector(".ad-quadro"),r=s.querySelector(".ad-range");const set=v=>q.style.setProperty("--x",v+"%");
 r.addEventListener("input",()=>set(r.value));set(r.value);
 new IntersectionObserver(([e],o)=>{if(!e.isIntersecting||RP.reduz)return;o.disconnect();const t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/1800),v=50+Math.sin(k*Math.PI*2)*30*(1-k);set(v);r.value=v;if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)},{threshold:.5}).observe(q)});
document.querySelectorAll("[data-ng]").forEach(s=>{const ns=[...s.querySelectorAll("[data-fill]")];const f=()=>{ns.forEach(n=>{const r=n.getBoundingClientRect(),p=RP.clamp((innerHeight-r.top)/(innerHeight*.7));n.style.setProperty("--f",(RP.reduz?100:p*100)+"%")})};f();addEventListener("scroll",f,{passive:true})});
</script>"""

# ── monta ──
i, j = base.index('<section class="hero3 hl"'), base.index('<section id="infraestrutura"')
herosHTML = "".join(f'<div data-var="hero" data-nome="{n}"{"" if k == 0 else " hidden"}>{h}</div>' for k, (n, h) in enumerate(HEROS))
def tira_fitas(h):
    i = h.find('<div class="fitas"')
    if i < 0: return h, None
    j = h.find('</div></div></div>', h.find('fita-verde', i)) + len('</div></div></div>')
    return h[:i] + h[j:], h[i:j]
FITAS = None
_s2 = []
for n, h in NOVOS + S2:
    h2, f = tira_fitas(h); FITAS = FITAS or f; _s2.append((n, h2))
S2 = _s2
S2 = [(n, h.replace('<section id="bairro"', '<section data-id-bairro id="bairro"')) for n, h in S2]
s2HTML = "".join(f'<div data-var="s2" data-nome="{n}"{"" if k == 0 else " hidden"}>{h}</div>' for k, (n, h) in enumerate(S2))
pg = base[:i] + herosHTML + FITAS + s2HTML + base[j:]
pg = pg.replace("</style>", CSS2 + "</style>", 1).replace("</body>", JS2 + "</body>", 1)
# ajustes de JS para várias variações na mesma página
pg = pg.replace('const esc=()=>{if(s.getBoundingClientRect().bottom>80)', 'const esc=()=>{if(s.closest("[hidden]"))return;if(s.getBoundingClientRect().bottom>80)', 1)
pg = pg.replace('f.querySelector("#r-nome").value', 'f.querySelector("input").value', 1)
pg = re.sub(r'<a class="volta-proto"[^>]*>.*?</a>', "", pg, count=1)
pg = pg.replace("</style>", CSS + CSS_BAIRRO + "</style>", 1)
pg = pg.replace("</body>", painel() + JS + "</body>", 1)

# ═══════════ HEADERS (6) ═══════════
MENU = [("O bairro", "bairro"), ("Infraestrutura", "infraestrutura"), ("Lazer", "lazer"), ("Galeria", "galeria"), ("Localização", "localizacao"), ("Mapa", "mapa"), ("Dúvidas", "duvidas")]
P = lambda t: f'<span class="pend">[PREENCHER] {t}</span>'
links = lambda itens: "".join(f'<li><a href="#{a}">{r}</a></li>' for r, a in itens)
MARCA = '<a class="marca" href="#" aria-label="Reserva do Parque Gravataí - RS"><img class="escuro" src="img/simbolo-verde.png" alt="" width="1054" height="310"><img class="claro" src="img/simbolo-creme.png" alt="" width="1054" height="310"></a>'
h0 = pg.index('<header class="cab cab-m"'); h1 = pg.index('</header>', h0) + len('</header>')
CAB_MENU = pg[h0:h1]
CABS = [("Menu em tela cheia", CAB_MENU),
        ("Clássico", f'''<header class="cab"><div class="wrap">{MARCA}<nav aria-label="Seções"><ul>{links(MENU)}</ul></nav>
  <div class="acoes"><a class="bt bt-linha so-desk" href="#cadastro">WhatsApp</a><a class="bt bt-verde" href="#cadastro">Receber a tabela</a></div></div></header>'''),
        ("Pílula", f'''<header class="pilula" data-pilula><a class="marca" href="#" aria-label="Reserva do Parque Gravataí - RS"><img src="img/simbolo-verde.png" alt="" width="1054" height="310"></a>
  <nav aria-label="Seções"><ul>{links(MENU[:6])}</ul></nav><a class="bt bt-verde" href="#cadastro">Receber a tabela</a></header>'''),
        ("Duas linhas", f'''<header class="cab cab-2l"><div class="cab-topo"><div class="wrap"><span>{ic("map-pin")} Lançamento · Gravataí - RS</span><span class="so-desk">Atendimento {P("telefone")}</span><a href="#cadastro">{ic("message-circle")} Chamar no WhatsApp</a></div></div>
  <div class="wrap">{MARCA}<nav aria-label="Seções"><ul>{links(MENU)}</ul></nav><div class="acoes"><a class="bt bt-verde" href="#cadastro">Receber a tabela</a></div></div></header>'''),
        ("Ilha da seção", f'''<header class="cab cab-ilha" data-ilha><div class="wrap">{MARCA}
  <div class="ilha"><button class="ilha-bt" type="button" aria-expanded="false"><span class="ilha-n">01</span><span class="ilha-t">Início</span>{ic("chevron-down")}<i class="ilha-p"></i></button>
  <ol class="ilha-lista" hidden>{"".join(f'<li><a href="#{a}"><b>{i+1:02d}</b>{r}</a></li>' for i, (r, a) in enumerate(MENU))}</ol></div>
  <div class="acoes"><a class="bt bt-verde" href="#cadastro">Receber a tabela</a></div></div></header>'''),
        ("Logo central", f'''<header class="cab cab-centro" data-menu><div class="wrap"><button class="bt bt-linha bt-menu" type="button" aria-expanded="false" aria-controls="menu-tela">{ic("menu")} Menu</button>
  {MARCA}<div class="acoes"><a class="bt bt-verde" href="#cadastro">Receber a tabela</a></div></div><span class="cab-prog" aria-hidden="true"></span></header>''')]
cabsHTML = "".join(f'<div data-var="cab" data-nome="{n}"{"" if k == 0 else " hidden"}>{h}</div>' for k, (n, h) in enumerate(CABS))
pg = pg[:h0] + cabsHTML + pg[h1:]
pg = pg.replace('const cab=document.querySelector(".cab");if(cab){const solido=()=>cab.classList.toggle("solido",scrollY>60);solido();addEventListener("scroll",solido,{passive:true})}',
                'document.querySelectorAll(".cab").forEach(cab=>{const solido=()=>cab.classList.toggle("solido",scrollY>60);solido();addEventListener("scroll",solido,{passive:true})});', 1)

CAB_CSS = r'''
/* header · duas linhas */
.cab-2l .cab-topo{background:var(--verde-escuro);color:var(--areia);font-size:13px;overflow:hidden;max-height:40px;transition:max-height .35s}
.cab-2l .cab-topo .wrap{height:36px;display:flex;justify-content:space-between;align-items:center;gap:16px}
.cab-2l .cab-topo span,.cab-2l .cab-topo a{display:inline-flex;align-items:center;gap:6px;text-decoration:none;color:inherit}
.cab-2l .cab-topo svg{width:14px;height:14px;color:var(--ipe)}
.cab-2l.solido .cab-topo{max-height:0}
.cab-2l:not(.solido){background:linear-gradient(180deg,rgba(15,31,18,.35),transparent)}
html:not([data-hero-escuro]) .cab-2l:not(.solido){background:none}
/* header · ilha da seção */
.cab-ilha .wrap{justify-content:space-between}
.ilha{position:relative;margin-inline:auto}
.ilha-bt{position:relative;display:inline-flex;align-items:center;gap:10px;height:44px;padding:0 16px;border-radius:99px;background:var(--verde-escuro);color:var(--areia);font-size:14px;font-weight:600;overflow:hidden;cursor:pointer;box-shadow:0 8px 24px rgba(23,47,27,.18)}
.ilha-n{color:var(--ipe);font-variant-numeric:tabular-nums}
.ilha-t{min-width:10ch;text-align:left;transition:opacity .2s}
.ilha-bt svg{width:16px;height:16px;opacity:.7}
.ilha-p{position:absolute;left:0;bottom:0;height:2px;width:var(--p,0%);background:var(--ipe)}
.ilha-lista{position:absolute;left:50%;top:calc(100% + 10px);transform:translateX(-50%);min-width:240px;background:var(--verde-escuro);border-radius:14px;padding:6px;box-shadow:0 18px 50px rgba(0,0,0,.3);display:grid}
.ilha-lista a{display:flex;gap:12px;padding:10px 14px;border-radius:8px;color:var(--areia);text-decoration:none;font-weight:500}
.ilha-lista a:hover,.ilha-lista a.on{background:rgba(215,203,174,.12);color:#fff}
.ilha-lista b{color:var(--ipe);font-size:12px;font-variant-numeric:tabular-nums}
/* header · logo central */
.cab-centro .wrap{display:grid;grid-template-columns:1fr auto 1fr;gap:16px}
.cab-centro .bt-menu{justify-self:start}
.cab-centro .marca img{height:44px;transition:height .35s}
.cab-centro.solido .marca img{height:30px}
.cab-centro .acoes{justify-self:end;margin:0}
.cab-centro .wrap{height:76px;transition:height .35s}.cab-centro.solido .wrap{height:64px}
html[data-hero-escuro] .cab:not(.solido) .bt-menu{border-color:rgba(215,203,174,.5);color:var(--areia)}
@media (max-width:960px){.cab-2l nav,.cab-ilha .ilha-t{display:none}.cab-ilha .ilha{margin-inline:auto}.cab-centro .acoes .bt{padding:0 12px}}
@media (max-width:960px){.cab-2l .cab-topo .so-desk{display:none}}
.cab-2l .cab-topo a{white-space:nowrap}
@media (max-width:560px){.cab-centro .acoes{display:none}.cab-ilha .acoes{display:none}.cab-2l .cab-topo .wrap{justify-content:center}.cab-2l .cab-topo .wrap>span:first-child{display:none}}
'''
CAB_JS = r'''<script>
/* header · ilha: mostra a seção atual, progresso e atalho para as outras */
document.querySelectorAll("[data-ilha]").forEach(h=>{const bt=h.querySelector(".ilha-bt"),lista=h.querySelector(".ilha-lista"),n=h.querySelector(".ilha-n"),t=h.querySelector(".ilha-t"),p=h.querySelector(".ilha-p"),as=[...lista.querySelectorAll("a")];
 const abrir=v=>{lista.hidden=!v;bt.setAttribute("aria-expanded",v)};bt.addEventListener("click",e=>{e.stopPropagation();abrir(lista.hidden)});as.forEach(a=>a.addEventListener("click",()=>abrir(false)));
 addEventListener("click",e=>{if(!e.target.closest(".ilha"))abrir(false)});
 const q=()=>{let atual=-1;as.forEach((a,i)=>{const s=document.querySelector(a.getAttribute("href"));if(s&&s.getBoundingClientRect().top<innerHeight*.4)atual=i});
  as.forEach((a,i)=>a.classList.toggle("on",i===atual));const nome=atual<0?"Início":as[atual].lastChild.textContent;if(t.textContent!==nome){t.textContent=nome;n.textContent=String(atual+1).padStart(2,"0")}
  p.style.setProperty("--p",scrollY/(document.body.scrollHeight-innerHeight)*100+"%")};q();addEventListener("scroll",q,{passive:true})});
/* painel fica logo abaixo do header escolhido */
(function(){const v=document.querySelector(".var");const f=()=>{const h=[...document.querySelectorAll('[data-var="cab"]:not([hidden]) header')][0];if(!h)return;v.style.top=Math.max(8,h.getBoundingClientRect().bottom+10)+"px"};
 f();addEventListener("scroll",f,{passive:true});addEventListener("resize",f);document.addEventListener("variacao-cab",f);setTimeout(f,400)})();
</script>'''
pg = pg.replace("</style>", CAB_CSS + "</style>", 1)
pg = pg.replace("</body>", CAB_JS + "</body>", 1)

# o arquivo principal do artifact não leva doctype/html/head/body próprios
head = pg[pg.index("<head>") + 6:pg.index("</head>")]
head = re.sub(r'<meta[^>]*>', "", head)
head = re.sub(r"<title>.*?</title>", "<title>Reserva do Parque Gravataí</title>", head)
corpo = pg[pg.index("<body>") + 6:pg.index("</body>")]
(R / "index.html").write_text(head + corpo)
print("cabs", len(CABS), "heros", len(HEROS), "s2", len(S2), "ok")
