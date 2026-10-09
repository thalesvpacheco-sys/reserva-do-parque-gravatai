Transforme o protótipo `prototipo/index.html` em um site Next.js. O resultado precisa ficar IDÊNTICO ao protótipo, que é o design aprovado pelo cliente.

O que "idêntico" quer dizer:
- Mesmo layout, espaçamentos, cores, fontes, textos, imagens e ordem das seções.
- Mesmas animações e interações: carrosséis, abas do hero, contadores, fitas, filtros, pilha de cartas, galeria e formulário em 2 etapas.
- Não redesenhe, não simplifique, não "melhore" e não troque nenhuma seção por outra versão, nem pela do Jardim Harmonia.
- Copie o CSS do protótipo com os mesmos nomes de classe para `src/app/lp.css`. O HTML de cada seção vira JSX quase linha a linha. O JS de cada seção vira um componente cliente com hooks, com o mesmo comportamento.
- O `index.html` também tem CSS de variações que não foram escolhidas: leve só as regras das classes que aparecem no HTML.

A organização e o deploy seguem `docs/BRIEF.md`, que você deve ler inteiro antes de começar:
1. Next 16, Tailwind 4 via PostCSS, `next build --webpack`, pronto para app Node na Hostinger.
2. Todo o conteúdo fica em `src/dados.ts`, com um componente por seção em `src/secoes/`.
3. A rota `/api/lead/` envia ao RD Station.
4. As imagens vão de `prototipo/img/` para `public/img/`.

Ignore `prototipo/variacoes.html`, `montar.py` e `limpar.js`.

Como conferir:
1. Rode o protótipo (`cd prototipo && python3 -m http.server 8000`) e o site (`npm run dev`) lado a lado.
2. Tire screenshots dos dois, seção por seção, em 1440px e 390px. Corrija toda diferença até ficarem iguais.
3. Rode `npm run lint` e `npm run build` até passarem sem erros.
4. Mantenha os `[PREENCHER]` como estão e liste-os no `README.md`.
5. Escreva o `README.md`, o `.env.example` e `docs/CHANGELOG.md`.

Commits: mensagem curta, em português, numa linha, sem linha de coautoria.
