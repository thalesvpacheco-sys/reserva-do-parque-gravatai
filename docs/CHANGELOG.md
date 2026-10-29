# Changelog

## 0.2.0 · 2026-10-29 · teaser de aprovação

- Rota `/teaser-aprovacao/` com o teaser da Nova Harmonia: abertura, mapa do Brasil que desce até Viamão com a rolagem, solidez nacional com contador, carrossel de obras, foto da família, rodapé e cadastro em diálogo.
- Conteúdo em `teaser` (`src/dados.ts`), componentes em `src/secoes/teaser/` e CSS próprio com prefixo `tz-` em `src/app/teaser-aprovacao/teaser.css`.
- `noindex`, bloqueada no `robots.txt`. O cadastro valida mas não envia dados (versão de aprovação).
- JSON-LD da LP movido do layout raiz para `src/secoes/JsonLd.tsx`, usado só pela home, para o teaser não herdar os dados do Reserva do Parque.
- Imagens em `public/img/teaser/`, convertidas para webp (o mapa foi de 3,6 MB para 258 KB).
- Conferência: comparação com o protótipo aprovado em 1440px; `npm run lint` e `npm run build` sem erros. Falta conferir em 390px.

## 0.1.0 · 2026-10-09 · primeira entrega

- Site Next.js 16 a partir do protótipo aprovado (`prototipo/index.html`): header Duas linhas, hero Painel, seção 2 Bento e as demais seções na mesma ordem.
- CSS do protótipo em `src/app/lp.css` com os mesmos nomes de classe, só com as regras das classes usadas. Tailwind 4 sem o preflight, para manter o reset do protótipo.
- Interações em componentes cliente: abas e slides do hero, cadastro rápido, contadores, fitas, filtros da infraestrutura com prévia, pinos do corte e do mapa, pilha de cartas do lazer, faixas e caixa da galeria, FAQ animado, formulário em 2 etapas e barra fixa no celular. Todas respeitam `prefers-reduced-motion`.
- Todo o conteúdo em `src/dados.ts`, com as pendências marcadas como `[PREENCHER]`.
- Rota `POST /api/lead/` com envio ao RD Station (UTMs, `gclid`, `fbclid`, `rdtrk`, consentimento, campo isca, 3 tentativas em 429 e log do lead em caso de falha).
- SEO: metadata, Open Graph com imagem 1200x630, JSON-LD (Organization, Place, FAQPage), `robots.txt`, `sitemap.xml` e ícone.
- Imagens de `prototipo/img/` organizadas em `public/img/`.
- Conferência: comparação elemento a elemento com o protótipo em 1440px e 390px sem diferenças; `npm run lint` e `npm run build` sem erros.
