# Changelog

## 0.5.0 · 2026-11-10 · nova copy do teaser de corretores

- Textos da abertura, da apresentação (Presença Nacional, 11 estados de atuação e 5 regiões), do convite e do formulário trocados pelos dos slides do cliente. A panorâmica de Viamão e o mosaico de empreendimentos ficam como estavam.
- Formulário: a pergunta "Você é corretor de imóveis?" (Sim ou Não, em `perfil`) substitui as três opções de perfil, e o campo Nome da imobiliária saiu. Botão "Quero receber as novidades".
- A apresentação perdeu o botão (os slides não têm). Títulos aceitam quebra de linha com `
` no `Rico`.

## 0.4.2 · 2026-11-10 · página de confirmação do teaser de corretores

- Rota `/teaser-corretor/obrigado/` trazida da versão que já estava no ar na Hostinger (era um HTML solto, fora do código): "Obrigado! Seu acesso prioritário está garantido.", com o monitoramento do RD. Texto em `teaserCorretor.obrigado` (`src/dados.ts`) e estilos em `teaser-corretor.css`.
- `npm run corretor:zip` passa a incluir `obrigado/index.html` no pacote. O `index.html` da Hostinger era idêntico ao gerado aqui (só muda o ID do build).
- Nada na página do teaser redireciona para `/obrigado/`: o cadastro mostra a confirmação na própria página.

## 0.4.1 · 2026-11-05 · fotos reais no mosaico do teaser de corretores

- Mosaico "Empreendimentos entregues" com fotos reais de Viamão, Teresina, Caruaru e Paço do Lumiar, no lugar dos renders. O The One (Raposa · MA) saiu por não ter foto real.
- Legenda com cidade e UF em todas as fotos.

## 0.4.0 · 2026-11-04 · RD Station nos teasers

- Código de monitoramento do RD nos dois teasers (`MonitoramentoRd`).
- Cadastros preparados para a captura do RD: identificador da conversão no `name` do formulário, consentimento com `data-privacy` e UTMs em campos escondidos (`CamposRastreioRd`).
- Saiu da confirmação o aviso "nenhum dado foi enviado".
- UTMs completas: `cf_utm_*` e URL de entrada no formulário, sempre com a campanha inteira da última visita com parâmetros.
- Cópia de cada lead na planilha de backup, pelo Apps Script de `scripts/planilha-leads.gs`. Só envia depois de preencher `planilhaLeads` em `src/dados.ts`.

## 0.3.0 · 2026-11-03 · teaser de corretores

- Rota `/teaser-corretor/` a partir do protótipo escolhido (DCBBBCA, títulos em 400): abertura meio a meio, panorâmica de Viamão, mosaico de empreendimentos, porte nacional com números, vendas com foto e texto e cadastro em cartão, aberto na página, com o perfil do corretor.
- Logo sem "Bairros Planejados" em `public/img/logo/logo-nova-harmonia-simples.svg`.
- `scripts/zip-teaser.mjs` agora atende aos dois teasers (`npm run teaser:zip` e `npm run corretor:zip`), e a conferência de arquivos do pacote usa a base de cada um.

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
