# Brief para codar a LP

Este documento é para quem vai transformar `prototipo/index.html` em um site Next.js pronto para a Hostinger. Leia-o inteiro antes de começar.

## Objetivo

Codar **exatamente o protótipo** `prototipo/index.html`: mesmo layout, mesmas classes, mesmo CSS, mesmas animações, mesmos textos e imagens. O protótipo é o design aprovado. Não redesenhe, não simplifique e não troque nada por algo "equivalente". Do Jardim Harmonia Canoas vêm só a stack, a organização das pastas e o deploy.

## Stack

- Next.js 16 (App Router), TypeScript, React 19
- Tailwind 4 via `@tailwindcss/postcss`, mais um `src/app/lp.css` com as classes dos componentes (porte as regras do protótipo como estão, com os mesmos nomes de classe)
- Ícones: `lucide-react` (o protótipo usa os mesmos nomes do Lucide via CDN)
- Fonte: Plus Jakarta Sans (400, 500, 600, 700) via `next/font/google`, na variável `--font-jakarta`
- Sem bibliotecas de carrossel ou animação: os carrosséis do protótipo são JS simples e viram componentes cliente (`"use client"`) com hooks

## Organização das pastas

```
reserva-do-parque-gravatai/
├── docs/
│   ├── BRIEF.md           este arquivo
│   ├── CHANGELOG.md       histórico de entregas
│   ├── IMAGENS.md         inventário das imagens e o que falta
│   └── MARCA.md           cores, logo e tipografia
├── prototipo/             referência visual (não entra no build)
├── public/
│   └── img/
│       ├── logo/          versões do logo e do símbolo
│       ├── banners/       hero e faixas de largura total
│       ├── carrosseis/    perspectivas e galeria (grande + versão -800)
│       ├── implantacao/   masterplan
│       └── og/            imagem de compartilhamento 1200x630
├── src/
│   ├── app/
│   │   ├── layout.tsx     fonte, metadata (SEO, Open Graph) e JSON-LD (Organization, Place, FAQPage)
│   │   ├── page.tsx       só monta as seções, na ordem
│   │   ├── globals.css    Tailwind e tokens
│   │   ├── lp.css         classes dos componentes
│   │   ├── icon.png
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── api/lead/route.ts
│   ├── dados.ts           TODO o conteúdo
│   └── secoes/            um componente por bloco
├── .env.example
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

**Regra de ouro:** nenhuma string de conteúdo dentro de `src/secoes/`. Todo texto, número, telefone, link, imagem e meta tag fica em `src/dados.ts`, exportado por seção (`empreendimento`, `seo`, `contato`, `header`, `hero`, `fitas`, `bairro`, `infraestrutura`, `lazer`, `cadastro`, `galeria`, `mapa`, `grupo`, `outros`, `faq`, `legal`, `barraMovel`, `rodape`). Pendências usam a constante `PREENCHER = "[PREENCHER]"`.

## Componentes (`src/secoes/`)

| Componente | Seção do protótipo | Comportamento |
|---|---|---|
| `Header.tsx` | `header.cab.cab-2l` | Duas linhas: barra de topo (local, telefone, WhatsApp) que recolhe ao rolar; o header fica sólido (`.solido`) depois do hero; menu no celular |
| `HeroPainel.tsx` | `section.hero3.hp` | Coluna verde com título, formulário rápido (nome e telefone) e 4 abas; à direita, slides com troca automática, setas, contador e barra de progresso na aba ativa. O formulário rápido leva os dados para o cadastro e envia |
| `Fitas.tsx` | `.fitas` | Duas faixas cruzadas (amarela e verde) com texto em loop |
| `BairroBento.tsx` | `section#bairro.bento` | Mosaico: frase, fotos com legenda, números 15 e 6 com contador animado, apoio com botão e faixa aérea larga no fim |
| `Infraestrutura.tsx` | `section#infraestrutura.gps` | 15 itens com ícones e filtros por categoria |
| `ComoConstruimos.tsx` | `section.obra` | Como no protótipo |
| `Lazer.tsx` | `section#lazer.pilha-sec` | 6 itens em pilha de cartas |
| `Cadastro.tsx` + `LeadForm.tsx` | `section#cadastro.cad` | Formulário em 2 etapas |
| `Galeria.tsx` | `section#galeria.gfs` | Faixa de fotos com filtros |
| `Localizacao.tsx` | `section#localizacao.lf` | Como no protótipo |
| `MapaBairro.tsx` | `section#mapa.mapa-sec` | Como no protótipo |
| `Grupo.tsx` | `section.grupo` | Como no protótipo |
| `Outros.tsx` | `section.outros` | Como no protótipo |
| `Faq.tsx` | `section#duvidas.faq` | Como no protótipo |
| `Legal.tsx` | `section#legal.legal` | Como no protótipo |
| `Rodape.tsx` | `footer.rod` | Como no protótipo |
| `BarraMovel.tsx` | barra fixa no celular | "Receber a tabela" no rodapé da tela |
| `Contador.tsx`, `util.ts`, `whatsapp.ts` | apoio | Contador animado, helpers, link de WhatsApp com mensagem |

Os dados de Lazer e Galeria estão nos atributos `data-pilha` e `data-faixa` do protótipo: passe-os para `dados.ts`.

O `index.html` ainda carrega CSS de variações que não foram escolhidas. Porte só as regras das classes da tabela acima.

## Lead (`src/app/api/lead/route.ts`)

O caminho é: formulário, depois `POST /api/lead/`, depois RD Station, que repassa ao CV CRM pela integração nativa. Não poste direto no CV, senão o lead duplica.

- O formulário envia JSON com `nome`, `email`, `telefone`, as UTMs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`), `gclid`, `fbclid` e o cookie `rdtrk`. As UTMs são guardadas da URL na primeira visita.
- Campo isca `website`, escondido: se vier preenchido, a rota responde ok e descarta.
- A rota valida e limpa os campos e normaliza o telefone para `+55DDDnúmero`.
- Envia para `https://api.rd.services/platform/conversions?api_key=...` com `cf_empreendimento: "Reserva do Parque Gravataí"`, as UTMs e o consentimento.
- Tenta até 3 vezes em caso de 429. Se falhar, registra o lead inteiro no log com `console.error`.
- Variáveis de ambiente, documentadas em `.env.example`:
  - `RD_API_KEY` (obrigatória)
  - `RD_CONVERSION_IDENTIFIER` (padrão `lp-reserva-do-parque-gravatai-formulario-principal`)
  - `CV_IDEMPREENDIMENTO` (opcional)

## Configuração para a Hostinger

`next.config.ts`:

```ts
const nextConfig: NextConfig = {
  images: { unoptimized: true },        // imagens já vão em webp no tamanho certo
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"],     // preview do Codespaces
};
```

`package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build --webpack",
  "start": "next start",
  "lint": "eslint"
}
```

No painel da Hostinger (app Node.js conectado ao GitHub):

- Configuração predefinida: Next.js, Node 22.x
- Comando de construção: `npm run build`
- Diretório de saída: `.next`
- Variáveis de ambiente: as do `.env.example`

O app roda com `next build` + `next start`. Não é export estático, porque a rota do lead precisa de servidor.

## Tokens de cor

| Token | Cor |
|---|---|
| verde | `#026938` |
| verde-escuro | `#172f1b` |
| areia | `#d7cbae` |
| ipê | `#e2b53e` |
| noite | `#0f1f12` |
| papel | `#f7f6f1` |

## Pendências de conteúdo

Estes pontos aparecem como `[PREENCHER]` e precisam vir do cliente:

- telefone (4 lugares) e e-mail
- endereço, via de acesso e ponto de referência
- quantidade de lotes no lançamento
- registro do loteamento (texto legal)
- domínio do site (para `seo.url`, `sitemap` e `robots`)

As imagens são do Morada dos Pássaros e servem só de referência. Quando chegarem as do Reserva do Parque, troque os arquivos e mantenha os nomes. Liste tudo em `docs/IMAGENS.md`.

Os textos da seção "O bairro" ("O Reserva do Parque nasce em Gravataí…") foram escritos para o protótipo e ainda precisam de aprovação.

## Critérios de pronto

- Visual igual ao protótipo em 1440px e 390px, sem rolagem horizontal
- Carrosséis, contadores, filtros, abas e formulários funcionando, respeitando `prefers-reduced-motion`
- Nenhum texto fixo dentro de `src/secoes/`
- `npm run lint` e `npm run build` sem erros
- `README.md` com estrutura, comandos e deploy
- `docs/CHANGELOG.md` com a primeira entrega
