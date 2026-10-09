# Reserva do Parque Gravataí

Landing page do bairro planejado Reserva do Parque, em Gravataí - RS (Nova Harmonia).

## Protótipo aprovado

A pasta `prototipo/` tem o protótipo em HTML estático que serve de referência visual para o código.

| Arquivo | O que é |
|---|---|
| `prototipo/index.html` | Versão escolhida: header **Duas linhas**, hero **Painel**, seção 2 **Bento** |
| `prototipo/variacoes.html` | Todas as variações com o painel de troca (para consulta) |
| `prototipo/img/` | Imagens de referência (vindas do Morada dos Pássaros) e logos |
| `prototipo/montar.py`, `prototipo/limpar.js` | Scripts que geraram o protótipo (não fazem parte do site) |

Para ver o protótipo:

```bash
cd prototipo && python3 -m http.server 8000
# abrir http://localhost:8000
```

## Próximo passo

Codar o site em Next.js seguindo [docs/BRIEF.md](docs/BRIEF.md). O prompt pronto para o Claude Code está em [docs/PROMPT.md](docs/PROMPT.md).
