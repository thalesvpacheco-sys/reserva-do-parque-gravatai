# Reserva do Parque Gravataí

Landing page do bairro planejado Reserva do Parque, em Gravataí - RS (Nova Harmonia).

O site é o protótipo aprovado (`prototipo/index.html`) em Next.js: mesmo layout, mesmas classes, mesmo CSS e mesmas interações. O protótipo continua no repositório como referência visual e não entra no build.

## Comandos

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # next build --webpack
npm start       # serve o build
```

Para comparar com o protótipo, sirva a pasta `prototipo/` em outra porta (ex.: `cd prototipo && python3 -m http.server 8000`) e abra os dois lado a lado.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind 4 via `@tailwindcss/postcss`, sem o preflight: o reset é o do protótipo, para a renderização ficar igual
- `lucide-react` 0.469.0, a mesma versão de ícones do protótipo
- Plus Jakarta Sans (400 a 700) via `next/font/google`, na variável `--font-jakarta`
- Sem bibliotecas de carrossel ou animação: o JS do protótipo virou componentes cliente com hooks

## Estrutura

```
docs/                BRIEF, CHANGELOG, IMAGENS (inventário) e MARCA (cores, logo, fonte)
prototipo/           referência visual aprovada (fora do build)
public/img/
  logo/              logo, símbolo, logos do grupo e o traçado de fundo
  carrosseis/        perspectivas, cada uma em tamanho grande e -800
  implantacao/       masterplan do mapa
  grupo/             fotos dos setores do Grupo SFA
  outros/            fotos dos outros empreendimentos
  og/                imagem de compartilhamento 1200x630
src/
  app/
    layout.tsx       fonte, metadata (SEO, Open Graph) e JSON-LD (Organization, Place, FAQPage)
    page.tsx         monta as seções na ordem do protótipo
    globals.css      Tailwind (theme + utilities) e tokens
    lp.css           classes do protótipo, com os mesmos nomes
    icon.png, robots.ts, sitemap.ts
    api/lead/route.ts
  dados.ts           TODO o conteúdo (textos, números, links, imagens, meta tags)
  secoes/            um componente por seção, mais Contador, Texto (Rico/Valor), util, useSwipe e whatsapp
```

Nenhum texto fica dentro de `src/secoes/`. Para mudar conteúdo, edite `src/dados.ts`. Nos textos, `**assim**` vira `<strong>` e `*assim*` vira `<em>`.

O `lp.css` tem só as regras do `index.html` que valem para as classes usadas na versão escolhida. As variações não escolhidas ficaram de fora.

## Pendências `[PREENCHER]`

Ficam em `src/dados.ts` e aparecem no site com sublinhado tracejado. Ao preencher, apague o `PREENCHER` e escreva o valor.

| O quê | Onde em `dados.ts` | Onde aparece |
|---|---|---|
| Telefone / WhatsApp | `contato.telefone` (ex.: `"(51) 99999-9999"`) | barra de topo, cadastro, rodapé e o menu em tela cheia (oculto). Preenchido, os botões "Chamar no WhatsApp" passam a abrir o `wa.me` |
| E-mail | `contato.email` | rodapé |
| Endereço do stand | `empreendimento.endereco` | rodapé e JSON-LD |
| CNPJ | `empreendimento.cnpj` | rodapé |
| Via de acesso e 2 pontos de referência | `localizacao.pontos` | seção Localização |
| Quantidade de lotes no lançamento | `bairro.numeros.lotes.v` (use um número para ele contar como os outros) | seção O bairro |
| Registro do loteamento | `legal.textos[0]` | Memorial e informações legais |
| Domínio do site | `seo.url` (ex.: `"https://reservadoparquegravatai.com.br"`) | canonical, Open Graph, sitemap e robots. Enquanto pendente, usa `http://localhost:3000` |

Também pendentes, fora do código:

- Os textos da seção "O bairro" foram escritos para o protótipo e precisam de aprovação.
- As imagens são do Morada dos Pássaros, só de referência. Veja [docs/IMAGENS.md](docs/IMAGENS.md).

## Lead

Caminho: formulário, depois `POST /api/lead/`, depois RD Station, que repassa ao CV CRM pela integração nativa. Não poste direto no CV, senão o lead duplica.

- O formulário envia `nome`, `email`, `telefone`, as UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`), `gclid`, `fbclid`, o cookie `rdtrk` e o consentimento. As UTMs são guardadas da URL na primeira visita (`localStorage`).
- Campo isca `website`, escondido: se vier preenchido, a rota responde ok e descarta.
- A rota valida e limpa os campos e normaliza o telefone para `+55DDDnúmero`.
- Envia a conversão com `cf_empreendimento: "Reserva do Parque Gravataí"`. As UTMs vão nos campos padrão (`traffic_source`, `traffic_medium`, `traffic_campaign`, `traffic_value` para o termo). `utm_content`, `gclid` e `fbclid` vão em `cf_utm_content`, `cf_gclid` e `cf_fbclid`, só quando existem. Esses campos personalizados precisam existir no RD.
- Tenta até 3 vezes em caso de 429. Se falhar, ou se faltar a chave, registra o lead inteiro no log com `console.error`.
- O formulário mostra a confirmação na hora, como no protótipo, e envia em segundo plano (`keepalive`).

### Variáveis de ambiente

Veja `.env.example`.

| Variável | Obrigatória | Padrão |
|---|---|---|
| `RD_API_KEY` | sim | |
| `RD_CONVERSION_IDENTIFIER` | não | `lp-reserva-do-parque-gravatai-formulario-principal` |
| `CV_IDEMPREENDIMENTO` | não | vai em `cf_idempreendimento` quando definido |

## Deploy na Hostinger

App Node.js conectado ao GitHub:

- Configuração predefinida: Next.js, Node 22.x
- Comando de construção: `npm run build`
- Diretório de saída: `.next`
- Variáveis de ambiente: as do `.env.example`

O app roda com `next build` + `next start`. Não é export estático, porque a rota do lead precisa de servidor. `next.config.ts` usa `images.unoptimized` (as imagens já vão em webp no tamanho certo) e `trailingSlash: true`.

## Diferenças conhecidas em relação ao protótipo

Nenhuma visual. A comparação elemento a elemento (posição, tamanho, estilos calculados, textos e imagens) bateu em 1440px e 390px. Dois comportamentos do protótipo foram mantidos de propósito:

- O menu em tela cheia (`#menu-tela`) existe, mas o header Duas linhas não tem botão para abri-lo. No celular, o header mostra o logo e "Receber a tabela".
- Na caixa da galeria, a legenda herda a regra `.cap` do CSS do protótipo (grade com espaçamento vertical grande), então o título e a descrição ficam bem abaixo da foto.
