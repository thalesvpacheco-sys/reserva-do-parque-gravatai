# Imagens

As perspectivas e fotos são do Morada dos Pássaros e servem só de referência. Quando chegarem as do Reserva do Parque, troque os arquivos **mantendo os nomes** (e o mesmo formato e proporção). Assim nada no código muda.

## O que falta

- Todas as perspectivas de `public/img/carrosseis/` (o portal ainda mostra "Morada dos Pássaros")
- `implantacao/implantacao.webp`: masterplan do Reserva do Parque. Se mudar, reposicione os pinos em `mapa.pontos` (`x`, `y` em % da imagem)
- `carrosseis/corte.webp`: se mudar, reposicione os pinos em `comoConstruimos.itens`
- `og/og.jpg`: hoje é um recorte de `portal.webp`. Gere de novo em 1200x630 com a imagem final
- Fotos dos outros empreendimentos marcadas como "Imagem provisória" (Vale e Arbore)

## Inventário

| Pasta | Arquivo | Onde aparece |
|---|---|---|
| `logo/` | `simbolo-verde.png`, `simbolo-creme.png` | header (versão escura e clara) e cartão do cadastro |
| `logo/` | `logo-verde.png` | rodapé e JSON-LD |
| `logo/` | `logo-creme.png` | sem uso hoje (versão para fundo escuro) |
| `logo/` | `logo-nova-harmonia.svg`, `logo-grupo-sfa.webp` | seção Grupo e rodapé |
| `logo/` | `tracado.svg` | fundo da seção Grupo e do rodapé |
| `carrosseis/` | `portal`, `parque-aereo`, `avenida`, `quadras-aereo` (grandes) | slides do hero e caixa da galeria |
| `carrosseis/` | `ciclofaixa.webp`, `descanso.webp` | fotos imersivas de largura total |
| `carrosseis/` | `localizacao.webp` | fundo da Localização e foto larga do bento |
| `carrosseis/` | versões `-800` | bento, prévia e lista da infraestrutura, pilha do lazer, faixas e miniaturas da galeria, menu |
| `carrosseis/` | `entrada-aerea`, `portal-frente`, `praca-aerea`, `academia`, `stand` (grandes) | caixa da galeria |
| `carrosseis/` | `corte.webp` | corte da rua em "Como construímos" |
| `carrosseis/` | `pergolado` | sem uso hoje |
| `implantacao/` | `implantacao.webp` | mapa do bairro |
| `grupo/` | `grupo-paisagem`, `grupo-entrada`, `grupo-atacarejo`, `grupo-hotel` | faixa de setores do Grupo SFA |
| `outros/` | `outros-*.webp` | cards dos outros empreendimentos |
| `og/` | `og.jpg` | compartilhamento (Open Graph e Twitter) |
| `teaser/` | `mapa-brasil`, `viamao-aerea`, `viamao-eu-viamao`, `viamao-por-do-sol`, `teresina-*`, `maranhao-*`, `familia` | teaser `/teaser-aprovacao/` (mapa do zoom, obras e foto da família). Imagens reais do cliente |

O brief previa uma pasta `banners/`. O hero e as faixas de largura total usam os mesmos arquivos da galeria, então eles ficaram só em `carrosseis/` para não duplicar.
