/*
 * TODO o conteúdo da LP. Nenhum texto fica dentro de src/secoes/.
 * Pendências usam PREENCHER e aparecem no site com sublinhado tracejado (.pend).
 * Nos textos, **negrito** vira <strong> e *itálico* vira <em> (ver src/secoes/Rico.tsx).
 */
import {
  Bike,
  Blocks,
  Cctv,
  CloudRain,
  Droplet,
  Footprints,
  Goal,
  Lightbulb,
  PawPrint,
  Route,
  Ruler,
  TrafficCone,
  Volleyball,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const PREENCHER = "[PREENCHER]";

/* caminhos das imagens em public/img */
const carrossel = (nome: string) => `/img/carrosseis/${nome}.webp`;
const carrossel800 = (nome: string) => `/img/carrosseis/${nome}-800.webp`;

export const empreendimento = {
  nome: "Reserva do Parque",
  nomeCompleto: "Reserva do Parque Gravataí",
  cidade: "Gravataí",
  uf: "RS",
  /* vai no cf_empreendimento do RD Station */
  rd: "Reserva do Parque Gravataí",
  incorporadora: "Nova Harmonia Bairros Planejados",
  razaoSocial: "Harmonia SFA Participações Societárias LTDA",
  cnpj: `${PREENCHER} `,
  siteGrupo: "https://novaharmonia.com.br/",
  privacidade: "https://novaharmonia.com.br/politica-de-privacidade/",
  facebook: "https://www.facebook.com/NovaHarmoniaBairrosPlanejados/",
  endereco: `${PREENCHER} endereço`,
};

export const seo = {
  /* domínio do site, ex.: "https://reservadoparquegravatai.com.br" */
  url: PREENCHER,
  titulo: "Reserva do Parque Gravataí",
  descricao:
    "Conheça o Reserva do Parque, bairro planejado em Gravataí - RS com infraestrutura completa e lazer para todas as idades. Cadastre-se e receba as condições de lançamento.",
  og: { imagem: "/img/og/og.jpg", largura: 1200, altura: 630, alt: "Portal de entrada do Reserva do Parque Gravataí" },
  local: "pt_BR",
  logo: "/img/logo/logo-verde.png",
};

export const contato = {
  /* como deve aparecer no site, ex.: "(51) 99999-9999". O link do WhatsApp usa os dígitos */
  telefone: `${PREENCHER} telefone`,
  email: `${PREENCHER} e-mail`,
  whatsappTexto: "Chamar no WhatsApp",
  whatsappMensagem: "Olá! Quero receber a tabela do Reserva do Parque Gravataí.",
};

export const header = {
  marca: {
    rotulo: "Reserva do Parque Gravataí - RS",
    escuro: { src: "/img/logo/simbolo-verde.png", largura: 1054, altura: 310 },
    claro: { src: "/img/logo/simbolo-creme.png", largura: 1054, altura: 310 },
  },
  topo: { local: "Lançamento · Gravataí - RS", atendimento: "Atendimento" },
  navRotulo: "Seções",
  nav: [
    { href: "#bairro", t: "O bairro", foto: "entrada-aerea" },
    { href: "#infraestrutura", t: "Infraestrutura", foto: "corte" },
    { href: "#lazer", t: "Lazer", foto: "petplace" },
    { href: "#galeria", t: "Galeria", foto: "praca-aerea" },
    { href: "#localizacao", t: "Localização", foto: "localizacao" },
    { href: "#mapa", t: "Mapa", foto: "implantacao" },
    { href: "#duvidas", t: "Dúvidas", foto: "descanso" },
  ],
  cta: { t: "Receber a tabela", href: "#cadastro" },
  /* menu em tela cheia: no protótipo aprovado ele existe, mas o header Duas linhas não tem botão para abrir */
  menu: {
    foto: carrossel800("entrada-aerea"),
    atendimento: "Atendimento ·",
    fechar: "Fechar menu",
  },
};

export const hero = {
  rotulo: "Lançamento · Gravataí - RS",
  titulo: "Viva em harmonia *com o futuro.*",
  sub: "Conheça o Reserva do Parque, bairro planejado com infraestrutura completa e lazer para todas as idades.",
  form: {
    nome: { rotulo: "Nome", placeholder: "Seu nome" },
    telefone: { rotulo: "WhatsApp", placeholder: "(00) 00000-0000" },
    botao: "Receber as condições",
  },
  slides: [
    { src: carrossel("portal"), t: "Portal de entrada" },
    { src: carrossel("parque-aereo"), t: "Parque linear" },
    { src: carrossel("avenida"), t: "Avenida com ciclofaixa" },
    { src: carrossel("quadras-aereo"), t: "Quadras de esporte" },
  ],
  /* tempo de cada slide, em ms */
  intervalo: 6500,
  setas: { anterior: "Foto anterior", proxima: "Próxima foto" },
  selo: "Imagem de referência",
};

export const fitas = {
  amarela: ["Pavimentação em CBUQ", "Ciclofaixa", "Petplace", "Monitoramento por câmeras", "Iluminação em LED"],
  verde: ["Bairro planejado em Gravataí", "Lazer para todas as idades", "Lançamento Nova Harmonia"],
};

export const bairro = {
  rotulo: "O bairro",
  frase:
    "O Reserva do Parque nasce em Gravataí como um bairro planejado, com **infraestrutura completa** e **lazer para todas as idades** desde o primeiro dia.",
  fotos: [
    { src: carrossel800("parque-aereo"), alt: "Parque linear visto do alto", legenda: "Parque linear" },
    { src: carrossel800("playground"), alt: "Playground infantil", legenda: "Playground infantil" },
    { src: carrossel("localizacao"), alt: "Vista aérea da região", legenda: "Gravataí · RS" },
  ],
  numeros: {
    infraestrutura: { v: 15, t: "itens de infraestrutura entregues" },
    lazer: { v: 6, t: "espaços de lazer para todas as idades" },
    /* troque PREENCHER pelo número (ex.: 420) para ele contar como os outros */
    lotes: { v: PREENCHER as number | string, t: "lotes no lançamento" },
  },
  apoio:
    "A Nova Harmonia está comprometida em trazer um novo patamar de infraestrutura para a cidade. Um bairro completo para a sua família aproveitar áreas verdes, lazer e qualidade de vida, tudo perto de você.",
  cta: { t: "Ver a infraestrutura", href: "#infraestrutura" },
};

type Item = { t: string; icone: LucideIcon };

const icones = {
  pavimentacao: Route,
  meioFio: Ruler,
  agua: Droplet,
  esgoto: Waves,
  sinalizacao: TrafficCone,
  drenagem: CloudRain,
  eletrica: Zap,
  iluminacao: Lightbulb,
  cameras: Cctv,
  petplace: PawPrint,
  ciclofaixa: Bike,
  playground: Blocks,
  cooper: Footprints,
  areia: Volleyball,
  poliesportiva: Goal,
};

export const infraestrutura = {
  rotulo: "Infraestrutura completa",
  titulo: "Um bairro completo para **você viver melhor!**",
  grupos: [
    { g: "todos", t: "Todos" },
    { g: "redes", t: "Ruas e redes" },
    { g: "seg", t: "Segurança e mobilidade" },
    { g: "lazer", t: "Lazer no bairro" },
  ],
  itens: [
    { g: "redes", im: "avenida", icone: icones.pavimentacao, t: "Pavimentação em CBUQ", d: "Asfalto CBUQ, concreto betuminoso usinado a quente, em todas as ruas." },
    { g: "redes", im: "corte", icone: icones.meioFio, t: "Meio-fio com sarjeta", d: "Meio-fio e sarjeta levam a água da chuva até a drenagem." },
    { g: "redes", im: "corte", icone: icones.agua, t: "Rede de água", d: "Rede de água chegando até cada lote." },
    { g: "redes", im: "corte", icone: icones.esgoto, t: "Rede de esgoto", d: "Rede de esgoto instalada antes da primeira casa." },
    { g: "seg", im: "entrada-aerea", icone: icones.sinalizacao, t: "Sinalização de trânsito", d: "Placas, faixas e pintura de solo nas ruas e cruzamentos." },
    { g: "redes", im: "corte", icone: icones.drenagem, t: "Rede de drenagem pluvial", d: "Galerias sob as ruas para escoar a água da chuva." },
    { g: "redes", im: "stand", icone: icones.eletrica, t: "Rede elétrica", d: "Rede elétrica pronta para ligar a sua casa." },
    { g: "redes", im: "praca", icone: icones.iluminacao, t: "Iluminação pública em LED", d: "Postes com LED nas ruas e nas áreas de lazer." },
    { g: "seg", im: "portal", icone: icones.cameras, t: "Monitoramento por câmeras", d: "Câmeras de monitoramento no bairro." },
    { g: "lazer", im: "petplace", icone: icones.petplace, t: "Petplace", d: "Espaço cercado para o seu pet correr e brincar." },
    { g: "seg", im: "ciclofaixa", icone: icones.ciclofaixa, t: "Ciclofaixa", d: "Faixa só para bicicletas no canteiro central da avenida." },
    { g: "lazer", im: "playground", icone: icones.playground, t: "Playground infantil", d: "Brinquedos para as crianças, perto de casa." },
    { g: "lazer", im: "caminhada", icone: icones.cooper, t: "Pista cooper", d: "Pista para caminhar e correr todos os dias." },
    { g: "lazer", im: "areia", icone: icones.areia, t: "Quadra de areia", d: "Vôlei e beach tennis sem sair do bairro." },
    { g: "lazer", im: "poliesportiva", icone: icones.poliesportiva, t: "Quadra poliesportiva", d: "Futsal e basquete no mesmo piso." },
  ],
  imagem800: carrossel800,
  cta: { t: "Quero me cadastrar!", href: "#cadastro" },
};

export const comoConstruimos = {
  rotulo: "Como construímos",
  titulo: "Infraestrutura à altura do padrão **Nova Harmonia** de qualidade",
  dica: "Toque nos números da imagem ou na lista.",
  imagem: {
    src: carrossel("corte"),
    alt: "Corte da rua mostrando pavimentação, meio-fio, drenagem e redes de água e esgoto",
    largura: 1600,
    altura: 900,
  },
  /* x e y: posição do pino sobre a imagem */
  itens: [
    { t: "Pavimentação em CBUQ", icone: icones.pavimentacao, x: "55%", y: "63%" },
    { t: "Meio-fio com sarjeta", icone: icones.meioFio, x: "28%", y: "74%" },
    { t: "Rede de água", icone: icones.agua, x: "17%", y: "84%" },
    { t: "Rede de esgoto", icone: icones.esgoto, x: "23.5%", y: "84%" },
    { t: "Rede de drenagem pluvial", icone: icones.drenagem, x: "52%", y: "90%" },
    { t: "Rede elétrica", icone: icones.eletrica, x: "73%", y: "12%" },
    { t: "Iluminação pública em LED", icone: icones.iluminacao, x: "63%", y: "5%" },
  ] satisfies (Item & { x: string; y: string })[],
};

/* faixas de foto em largura total com hover imersivo */
export const imersivo = {
  ciclofaixa: {
    href: "#cadastro",
    src: carrossel("ciclofaixa"),
    bolha: "Quero conhecer",
    ref: "Avenida com ciclofaixa · Imagem de referência",
    titulo: "Pedalar até a praça *sem sair do bairro.*",
    botao: "Receber a tabela de lançamento",
  },
  fim: {
    href: "#cadastro",
    src: carrossel("descanso"),
    bolha: "Garantir meu lote",
    titulo: "Clique e faça a melhor escolha *para sua família*",
    sub: "Vantagens para quem garantir antes seu lote.",
    botao: "Cadastre-se",
  },
};

export const lazer = {
  rotulo: "Lazer",
  titulo: "Diversão e qualidade de vida **para todas as idades**",
  setas: { anterior: "Anterior", proxima: "Próximo" },
  dica: "arraste a foto",
  rotuloPilha: "Espaços de lazer. Use as setas do teclado.",
  /* tempo de cada carta, em ms */
  intervalo: 5000,
  itens: [
    { t: "Petplace", d: "Espaço cercado para o seu pet correr e brincar, com bancos à sombra para quem acompanha.", src: carrossel800("petplace"), icone: icones.petplace },
    { t: "Ciclofaixa", d: "Pedalar pelo bairro numa faixa só para bicicletas, no canteiro central da avenida.", src: carrossel800("ciclofaixa"), icone: icones.ciclofaixa },
    { t: "Playground infantil", d: "Brinquedos de madeira sobre piso emborrachado, perto de casa.", src: carrossel800("playground"), icone: icones.playground },
    { t: "Pista cooper", d: "Para caminhar e correr todos os dias, entre árvores e pergolados.", src: carrossel800("caminhada"), icone: icones.cooper },
    { t: "Quadra de areia", d: "Vôlei e beach tennis com iluminação para jogar à noite.", src: carrossel800("areia"), icone: icones.areia },
    { t: "Quadra poliesportiva", d: "Futsal e basquete no mesmo piso, cercada e iluminada.", src: carrossel800("poliesportiva"), icone: icones.poliesportiva },
  ],
};

export const cadastro = {
  rotulo: "Condições de lançamento",
  titulo: "Seja um dos primeiros compradores e tenha **condições exclusivas!**",
  passos: [
    { n: "01", t: "Cadastre-se", d: "Nome e WhatsApp. Leva menos de um minuto." },
    { n: "02", t: "Receba a tabela e a planta", d: "Um consultor manda as condições de lançamento e os lotes disponíveis." },
    { n: "03", t: "Escolha seu lote", d: "Quem se cadastra antes escolhe com mais opções." },
  ],
  card: {
    simbolo: { src: "/img/logo/simbolo-verde.png", largura: 1054, altura: 310 },
    titulo: "Cadastro de lançamento",
    sub: "Leva menos de um minuto",
  },
  form: {
    etapa: (n: number) => `Etapa ${n} de 2`,
    pronto: "Pronto",
    nome: { rotulo: "Nome completo", placeholder: "Seu nome completo" },
    telefone: { rotulo: "Telefone / WhatsApp", placeholder: "(00) 00000-0000" },
    continuar: "Continuar",
    email: { rotulo: "Email", placeholder: "voce@email.com" },
    aceite: {
      antes: "Aceito receber via Whatsapp, ligação, email e outras formas de contato da NOVA HARMONIA, com ações de marketing, ofertas de produto e serviços, conforme sua ",
      link: "Politica de Privacidade",
      depois: ".",
    },
    voltar: "Voltar",
    enviar: "Quero condição de lançamento",
    ok: "Cadastro recebido! Em breve nossa equipe entra em contato pelo WhatsApp.",
  },
  conversar: "Prefere conversar agora?",
};

export const galeria = {
  rotulo: "Perspectivas",
  titulo: "Uma volta *pelo bairro*",
  dica: "Arraste as faixas ou clique numa foto para ampliar.",
  ampliar: "Ampliar:",
  itens: [
    { im: "portal", t: "Portal de entrada", c: "Chegada", d: "Portal com letreiro e rotatória na chegada pela avenida principal." },
    { im: "entrada-aerea", t: "Entrada vista do alto", c: "Chegada", d: "Portal, rotatória, stand de vendas e o começo da ciclofaixa." },
    { im: "portal-frente", t: "Acesso", c: "Chegada", d: "Pista dupla, canteiros e palmeiras logo na entrada." },
    { im: "praca-aerea", t: "Praça do playground", c: "Lazer", d: "Playground, pergolados e caminhos à sombra." },
    { im: "parque-aereo", t: "Parque linear", c: "Lazer", d: "Pergolados, academia ao ar livre e pista cooper." },
    { im: "academia", t: "Academia ao ar livre", c: "Lazer", d: "Aparelhos de exercício entre as árvores." },
    { im: "quadras-aereo", t: "Quadras", c: "Lazer", d: "Quadra poliesportiva e quadra de areia lado a lado." },
    { im: "avenida", t: "Avenida principal", c: "Ruas e comércio", d: "Canteiro central com palmeiras e ciclofaixa." },
    { im: "stand", t: "Stand de vendas", c: "Ruas e comércio", d: "Venha conhecer o projeto de perto." },
    { im: "descanso", t: "Área de descanso", c: "Ruas e comércio", d: "Bancos e pergolado ao lado da ciclofaixa." },
  ],
  /* duas faixas: velocidade (px por quadro, negativa corre ao contrário) e índices dos itens */
  linhas: [
    { vel: 0.6, itens: [0, 1, 2, 3, 4] },
    { vel: -0.5, itens: [5, 6, 7, 8, 9] },
  ],
  imagem: carrossel,
  imagem800: carrossel800,
  setas: { anterior: "Anterior", proxima: "Próxima" },
  fechar: "Fechar",
};

export const localizacao = {
  imagem: { src: carrossel("localizacao"), alt: "Vista aérea com a localização do bairro" },
  selo: "Imagem de referência",
  rotulo: "Localização",
  titulo: "O futuro de Gravataí **passa por aqui!**",
  texto: "O Reserva do Parque está na região que mais cresce e se valoriza em Gravataí. Um novo bairro planejado para viver e empreender.",
  pontos: [`${PREENCHER} via de acesso`, `${PREENCHER} ponto de referência`, `${PREENCHER} ponto de referência`],
  cta: { t: "Quero saber mais!", href: "#cadastro" },
};

export const mapa = {
  rotulo: "Mapa do bairro",
  dica: "Passe o mouse ou toque nos pontos. Cada um abre uma parte do bairro.",
  imagem: { src: "/img/implantacao/implantacao.webp", alt: "Implantação do bairro com ruas, quadras e lotes", largura: 1536, altura: 776 },
  pontos: [
    { t: "Entrada do bairro", d: "Portal e rotatória na chegada pela avenida principal.", x: "41%", y: "78%" },
    { t: "Avenida com ciclofaixa", d: "Canteiro central com palmeiras e faixa só para bicicletas.", x: "41%", y: "40%" },
    { t: "Área verde central", d: "Um grande espaço verde no meio do bairro.", x: "48.5%", y: "55%" },
    { t: "Praça de lazer", d: "Playground, quadras e petplace perto de casa.", x: "82.5%", y: "48%" },
    { t: "Bosque", d: "Mata preservada dentro do bairro.", x: "75%", y: "60%" },
  ],
};

export const grupo = {
  tracado: "/img/logo/tracado.svg",
  logos: [
    { src: "/img/logo/logo-nova-harmonia.svg", alt: "Nova Harmonia Bairros Planejados" },
    { src: "/img/logo/logo-grupo-sfa.webp", alt: "Grupo SFA" },
  ],
  rotulo: "Uma grande história não se escreve da noite para o dia",
  titulo: "Confie em quem é referência nacional em **empreendimentos de qualidade.**",
  textos: [
    "No DNA da Nova Harmonia, estão a solidez e os valores do Grupo São Francisco de Assis, um gigante com atuação nacional em diversos setores. Um modelo de desenvolvimento urbano sustentável, eficiente e replicável às diferentes características, regiões e cidades do Brasil.",
    "Levamos a oportunidade de um brasileiro poder conquistar seu lugar no mundo, ter um imóvel para poder chamar de seu, seja para investir ou construir para morar.",
  ],
  unidade: "lotes",
  numeros: [
    { v: 1369, nome: "Parque Harmonia", local: "Viamão/RS" },
    { v: 1895, nome: "Villa Imperial", local: "Teresina/PI" },
    { v: 1181, nome: "Reserva Harmonia Caruaru", local: "Caruaru/PE" },
    { v: 341, nome: "The One – Edição Maranhão", local: "Raposa/MA" },
  ],
  fonte: "Números publicados em novaharmonia.com.br.",
  setoresRotulo: "Setores do Grupo SFA",
  /* com src: cartão com foto e etiqueta; sem src: cartão verde com o nome */
  setores: [
    { t: "Bairros planejados", src: "/img/grupo/grupo-paisagem.webp" },
    { t: "Construção civil" },
    { t: "Shopping centers", src: "/img/grupo/grupo-entrada.webp" },
    { t: "Agronegócio" },
    { t: "Rede Novo Atacarejo", src: "/img/grupo/grupo-atacarejo.webp" },
    { t: "Faculdades" },
    { t: "Hotéis", src: "/img/grupo/grupo-hotel.webp" },
  ] as { t: string; src?: string }[],
};

export const outros = {
  rotulo: "Nova Harmonia no Rio Grande do Sul",
  titulo: "Conheça outros **empreendimentos**",
  texto: "Vale e Hortênsias também ficam em Gravataí. Viamão e Cachoeirinha completam a Região Metropolitana.",
  provisoria: "Imagem provisória",
  itens: [
    { nome: "Vale", local: "Harmoni · Gravataí · RS", d: "Viver em Gravataí acaba de ficar muito melhor.", src: "/img/outros/outros-salao-de-festas-externo.webp", provisoria: true, href: "https://novaharmonia.com.br/" },
    { nome: "Hortênsias", local: "Harmoni · Gravataí · RS", d: "Gravataí, em sua mais bela forma.", src: "/img/outros/outros-familia-jardim.webp", provisoria: false, href: "https://novaharmonia.com.br/" },
    { nome: "Vinhedos", local: "Harmoni · Viamão · RS", d: "Condomínio horizontal com lotes a partir de 160m².", src: "/img/outros/outros-portico-original.webp", provisoria: false, href: "https://novaharmonia.com.br/" },
    { nome: "Jardins", local: "Harmoni · Cachoeirinha · RS", d: "Um novo patamar de viver bem em Cachoeirinha.", src: "/img/outros/outros-menina-e-cachorro.webp", provisoria: false, href: "https://novaharmonia.com.br/" },
    { nome: "Essenza", local: "Harmoni · Cachoeirinha · RS", d: "Um novo patamar de viver bem em Cachoeirinha.", src: "/img/outros/outros-familia-ao-ar-livre.webp", provisoria: false, href: "https://novaharmonia.com.br/" },
    { nome: "Arbore", local: "Harmoni · Cachoeirinha · RS", d: "Viva com grande estilo em Cachoeirinha.", src: "/img/outros/outros-portico-original.webp", provisoria: true, href: "https://novaharmonia.com.br/" },
  ],
};

export const faq = {
  rotulo: "Dúvidas",
  titulo: "Perguntas frequentes",
  cta: { pergunta: "Não achou sua pergunta?", t: "Falar com um consultor", href: "#cadastro" },
  itens: [
    { p: "O que é um bairro planejado?", r: "É um bairro que nasce com projeto completo antes da primeira casa: ruas, redes, áreas verdes, lazer e espaço para comércio já previstos no desenho." },
    { p: "A infraestrutura é entregue pronta?", r: "Sim. O Reserva do Parque é entregue com pavimentação em CBUQ, meio-fio com sarjeta, redes de água, esgoto, drenagem pluvial e elétrica, iluminação pública em LED e os espaços de lazer." },
    { p: "Como funcionam o preço e o pagamento?", r: "As condições de lançamento vão primeiro para quem se cadastra. Preencha o formulário e um consultor manda a tabela e as formas de pagamento." },
    { p: "Onde fica o Reserva do Parque?", r: "Em Gravataí, no Rio Grande do Sul. O endereço completo entra aqui assim que for confirmado." },
    { p: "Quem está por trás do empreendimento?", r: "A Nova Harmonia Bairros Planejados, empresa do Grupo São Francisco de Assis, especializada em bairros planejados em vários estados do Brasil." },
  ],
};

export const legal = {
  titulo: "Memorial e informações legais",
  textos: [
    `${PREENCHER} registro do Reserva do Parque, com matrícula, cartório de registro de imóveis e aprovação da prefeitura de Gravataí/RS.`,
    "As imagens, ilustrações, artes, perspectivas, plantas humanizadas, maquete apresentada no stand de vendas, folders, material publicitário, outdoors, anúncios ou qualquer outra forma são ilustrativas e artísticas, podendo apresentar variações em relação à obra final em função do desenvolvimento dos projetos executivos, da necessidade de adequabilidades técnicas ou do atendimento a postulados legais.",
    "Conforme legislação, as dimensões aqui constantes poderão sofrer uma variação, tanto para mais quanto para menos, de até 5% (cinco por cento).",
  ],
};

export const barraMovel = {
  texto: "Condições de lançamento",
  cta: { t: "Receber a tabela", href: "#cadastro" },
};

export const rodape = {
  tracado: "/img/logo/tracado.svg",
  logo: { src: "/img/logo/logo-verde.png", alt: "Reserva do Parque Gravataí - RS" },
  texto: "Bairro planejado em Gravataí - RS, com infraestrutura completa, áreas verdes e lazer para todas as idades.",
  redes: { facebook: "Facebook da Nova Harmonia", whatsapp: "Chamar no WhatsApp" },
  navRotulo: "Seções do site",
  colunaBairro: {
    titulo: "O bairro",
    links: [
      { href: "#bairro", t: "Conheça o bairro" },
      { href: "#infraestrutura", t: "Infraestrutura" },
      { href: "#lazer", t: "Lazer" },
      { href: "#galeria", t: "Galeria" },
      { href: "#mapa", t: "Mapa do bairro" },
      { href: "#duvidas", t: "Perguntas frequentes" },
    ],
  },
  colunaAtendimento: {
    titulo: "Atendimento",
    whatsapp: "WhatsApp",
    email: "E-mail",
    stand: "Stand de vendas",
    cta: { t: "Receber a tabela", href: "#cadastro" },
  },
  colunaRealizacao: {
    titulo: "Realização",
    logos: [
      { src: "/img/logo/logo-nova-harmonia.svg", alt: "Nova Harmonia Bairros Planejados" },
      { src: "/img/logo/logo-grupo-sfa.webp", alt: "Grupo SFA" },
    ],
    site: "novaharmonia.com.br ↗",
  },
  copyright: { antes: `© ${empreendimento.razaoSocial} · CNPJ`, depois: "· Imagens meramente ilustrativas." },
  legaisRotulo: "Links legais",
  privacidade: "Política de Privacidade",
  memorial: { t: "Memorial e informações legais", href: "#legal" },
  topo: "Voltar ao topo",
};

