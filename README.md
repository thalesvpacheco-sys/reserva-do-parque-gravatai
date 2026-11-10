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
    teaser-aprovacao/  rota /teaser-aprovacao/ (page.tsx e teaser.css), ver "Teaser de aprovação"
    teaser-corretor/   rota /teaser-corretor/ (page.tsx e teaser-corretor.css), ver "Teaser de corretores"
    globals.css      Tailwind (theme + utilities) e tokens
    lp.css           classes do protótipo, com os mesmos nomes
    icon.png, robots.ts, sitemap.ts
    api/lead/route.ts
  dados.ts           TODO o conteúdo (textos, números, links, imagens, meta tags)
  secoes/            um componente por seção, mais Contador, JsonLd, Texto (Rico/Valor), util, useSwipe e whatsapp
    teaser/          componentes do teaser de aprovação
    teaser-corretor/ componentes do teaser de corretores
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

## Teaser de aprovação

`/teaser-aprovacao/` é a página do teaser da Nova Harmonia para Gravataí, Cachoeirinha e Canoas, publicada aqui só para o cliente aprovar. Não faz parte da LP do Reserva do Parque.

- Conteúdo em `teaser` (`src/dados.ts`), componentes em `src/secoes/teaser/` e estilos em `src/app/teaser-aprovacao/teaser.css`. Todas as classes levam o prefixo `tz-`, porque o `lp.css` é global.
- Fora dos buscadores: `noindex` na página, bloqueada no `robots.txt` e fora do `sitemap.xml`.
- O cadastro envia ao RD pelo código de monitoramento: ver [Lead dos teasers](#lead-dos-teasers).
- Pendências marcadas com tracejado (passe o mouse para ver a pergunta): número de estados (11) e telefone `(51) 99719-6426`, que é o das outras LPs.
- Imagens em `public/img/teaser/`. O JSON-LD da LP fica em `src/secoes/JsonLd.tsx` e só a home usa.

## Teaser de corretores

`/teaser-corretor/` é a versão do teaser para corretores e imobiliárias, a combinação DCBBBCA do protótipo, com títulos em peso 400.

- Conteúdo em `teaserCorretor` (`src/dados.ts`), componentes em `src/secoes/teaser-corretor/` e estilos em `src/app/teaser-corretor/teaser-corretor.css`, com prefixo `tc-`. A base (`tz-`) vem do `teaser.css`.
- Publicação: `npm run corretor:zip` gera `teaser-corretor-site.zip`, para extrair dentro de `public_html/teaser-corretor/`. O dos clientes é `npm run teaser:zip`, para `public_html/teaser-cliente/`.
- O cadastro envia ao RD pelo código de monitoramento: ver [Lead dos teasers](#lead-dos-teasers). Fora dos buscadores, como o dos clientes.
- A foto do bloco de vendas é provisória: falta a de corretor em atendimento.

## Lead dos teasers

Os teasers são HTML estático na hospedagem do WordPress, sem servidor Next, então não usam `/api/lead/`. Quem envia é o código de monitoramento do RD (`src/secoes/teaser/MonitoramentoRd.tsx`), que captura o formulário no clique do botão, se ele estiver válido, e manda a conversão direto ao RD.

| Teaser | Identificador da conversão (`name` do `<form>`) | Campos |
| --- | --- | --- |
| Clientes | `teaser-cliente-nova-harmonia` | `nome`, `telefone`, `cidade`, `email`, `consentimento` |
| Corretores | `teaser-corretor-nova-harmonia` | os mesmos, mais `perfil` (`sim` ou `nao`, da pergunta "Você é corretor de imóveis?") |

- Em campos escondidos (`CamposRastreioRd.tsx`) vão as 5 UTMs, `gclid`, `fbclid` e a URL de entrada completa: `traffic_source`, `traffic_medium`, `traffic_campaign`, `traffic_value`, `cf_utm_source`, `cf_utm_medium`, `cf_utm_campaign`, `cf_utm_term`, `cf_utm_content`, `cf_gclid`, `cf_fbclid` e `cf_url_entrada`. Os `cf_utm_*` existem porque o cookie do RD sobrescreve o `traffic_source` e a URL da conversão vai sem os parâmetros. Os campos personalizados precisam existir no RD.
- Vale a campanha inteira da última visita que veio com parâmetros, sem misturar duas campanhas. Quem volta sem UTM mantém a campanha guardada (`localStorage`), o que também vale ao testar no mesmo navegador.
- O checkbox de aceite leva `data-privacy="true"` e `value="1"`, exigidos pelo RD para registrar o consentimento.
- **Mapeamento no RD** (Integrações > Integração de formulário > Editar), já feito nos dois identificadores: `telefone` em Celular, `consentimento` em Consentimento de Comunicação. O campo `imobiliaria` saiu do formulário dos corretores (o mapeamento no RD pode ficar). Sem isso o aceite não vira base legal e o número cai em Telefone fixo. `perfil`, `cf_gclid`, `cf_fbclid` e `cf_url_entrada` não têm campo correspondente no RD e ficam só na planilha, até serem criados lá.
- Um formulário só aparece nessa tela depois da primeira conversão. Os dois estão listados com a URL local do primeiro teste, mas valem pelo identificador: conversões de `novaharmonia.com.br` usam o mesmo mapeamento, sem criar outra entrada.
- O CV CRM não recebe estes leads pela integração direta: será ligado por um fluxo de automação no RD.
- **Testes geram lead de verdade.** O script envia de qualquer endereço, inclusive de `localhost` e de `/teaser-aprovacao/`.
- Não há `cf_empreendimento` nem campo isca: o RD captura tudo o que estiver no formulário, sem filtro. Quem bloqueia o script (bloqueador de anúncios) vê a confirmação, mas o lead não chega.

### Planilha de backup

Cada cadastro também vai direto do formulário (`src/secoes/teaser/planilha.ts`) para a planilha "Backup NV HARMONIA - LEADS lançamento", sem passar pelo RD. Chega mesmo se o script do RD for bloqueado. Colunas: data, teaser, os campos do formulário, as 5 UTMs, `gclid`, `fbclid` e a URL de entrada.

Para ligar:

1. Na planilha, abra Extensões > Apps Script e cole o conteúdo de `scripts/planilha-leads.gs`.
2. Implantar > Nova implantação > App da Web. Executar como **Eu**, acesso a **Qualquer pessoa**. Autorize com a conta dona da planilha.
3. Copie a URL terminada em `/exec` para `planilhaLeads` em `src/dados.ts` e gere os zips. Com `planilhaLeads` vazia, nada é enviado.

Alterar o script ou o acesso depois exige nova versão em Implantar > Gerenciar implantações, mantendo a mesma URL. Se um POST sem login na URL responder 401, o acesso não está em **Qualquer pessoa** e os visitantes não gravam na planilha. A URL é pública e só permite escrever. O script ignora envios sem aceite, sem e-mail válido ou de teaser desconhecido, e impede que um texto vire fórmula. A planilha guarda dados pessoais: compartilhe só com quem precisa.

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
