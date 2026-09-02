// Código de cores da coleta seletiva definido pela Resolução CONAMA 275/2001.
// A interface inteira é construída em cima dele: a cor não é decoração, é a
// forma oficial de identificar o resíduo.
export const MATERIAIS = {
  papel: {
    id: 'papel',
    nome: 'Papel',
    cor: '#0B5FD9',
    corNome: 'Azul',
    aceita: 'Caixas, revistas, sulfite e papelão seco.',
    recusa: 'Papel engordurado, guardanapo e papel higiênico.',
    textoSobreCor: '#FFFFFF'
  },
  plastico: {
    id: 'plastico',
    nome: 'Plástico',
    cor: '#D6301F',
    corNome: 'Vermelho',
    aceita: 'Garrafas PET, potes, sacolas e embalagens.',
    recusa: 'Cabo de panela, tomada e adesivos.',
    textoSobreCor: '#FFFFFF'
  },
  vidro: {
    id: 'vidro',
    nome: 'Vidro',
    cor: '#12833F',
    corNome: 'Verde',
    aceita: 'Garrafas e potes limpos, sem tampa.',
    recusa: 'Espelho, lâmpada, cerâmica e vidro temperado.',
    textoSobreCor: '#FFFFFF'
  },
  metal: {
    id: 'metal',
    nome: 'Metal',
    cor: '#F2B705',
    corNome: 'Amarelo',
    aceita: 'Latas, tampas, alumínio e ferragens pequenas.',
    recusa: 'Lata de tinta, aerossol e esponja de aço.',
    textoSobreCor: '#14171A'
  },
  eletronico: {
    id: 'eletronico',
    nome: 'Eletrônicos',
    cor: '#E8631A',
    corNome: 'Laranja',
    aceita: 'Celulares, cabos, placas, pilhas e baterias.',
    recusa: 'Lâmpada fluorescente e medicamento vencido.',
    textoSobreCor: '#FFFFFF'
  },
  oleo: {
    id: 'oleo',
    nome: 'Óleo de cozinha',
    cor: '#7A4A21',
    corNome: 'Marrom',
    aceita: 'Óleo usado em garrafa PET fechada.',
    recusa: 'Óleo de motor e qualquer líquido misturado.',
    textoSobreCor: '#FFFFFF'
  }
};

export const ORDEM_MATERIAIS = ['papel', 'plastico', 'vidro', 'metal', 'eletronico', 'oleo'];

export const listaMateriais = () => ORDEM_MATERIAIS.map((id) => MATERIAIS[id]);

export const material = (id) => MATERIAIS[id];
