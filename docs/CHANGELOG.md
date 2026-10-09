# Changelog

## 0.1.0 · 2026-10-09 · primeira entrega

- Site Next.js 16 a partir do protótipo aprovado (`prototipo/index.html`): header Duas linhas, hero Painel, seção 2 Bento e as demais seções na mesma ordem.
- CSS do protótipo em `src/app/lp.css` com os mesmos nomes de classe, só com as regras das classes usadas. Tailwind 4 sem o preflight, para manter o reset do protótipo.
- Interações em componentes cliente: abas e slides do hero, cadastro rápido, contadores, fitas, filtros da infraestrutura com prévia, pinos do corte e do mapa, pilha de cartas do lazer, faixas e caixa da galeria, FAQ animado, formulário em 2 etapas e barra fixa no celular. Todas respeitam `prefers-reduced-motion`.
- Todo o conteúdo em `src/dados.ts`, com as pendências marcadas como `[PREENCHER]`.
- Rota `POST /api/lead/` com envio ao RD Station (UTMs, `gclid`, `fbclid`, `rdtrk`, consentimento, campo isca, 3 tentativas em 429 e log do lead em caso de falha).
- SEO: metadata, Open Graph com imagem 1200x630, JSON-LD (Organization, Place, FAQPage), `robots.txt`, `sitemap.xml` e ícone.
- Imagens de `prototipo/img/` organizadas em `public/img/`.
- Conferência: comparação elemento a elemento com o protótipo em 1440px e 390px sem diferenças; `npm run lint` e `npm run build` sem erros.
