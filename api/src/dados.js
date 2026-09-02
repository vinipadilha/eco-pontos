// Dados mock dos pontos de coleta.
// As chaves de material seguem a Resolução CONAMA 275/2001, que define o
// código de cores da coleta seletiva no Brasil.
const pontos = [
  {
    id: 'ecp-001',
    nome: 'Ecoponto Centro Cívico',
    bairro: 'Centro Cívico',
    endereco: 'R. Mateus Leme, 1820',
    materiais: ['papel', 'plastico', 'vidro', 'metal'],
    horarios: [
      { dias: 'Segunda a sexta', abre: '08:00', fecha: '18:00' },
      { dias: 'Sábado', abre: '08:00', fecha: '12:00' }
    ],
    telefone: '(41) 3350-8484',
    observacao: 'Recebe grandes volumes de papelão desmontado. Não aceita entulho de obra.',
    programa: 'Lixo que Não é Lixo',
    coordenadas: { lat: -25.4152, lng: -49.2712 }
  },
  {
    id: 'ecp-002',
    nome: 'Estação Verde Batel',
    bairro: 'Batel',
    endereco: 'Av. do Batel, 1440 - estacionamento inferior',
    materiais: ['papel', 'plastico', 'metal', 'oleo'],
    horarios: [
      { dias: 'Segunda a sábado', abre: '09:00', fecha: '20:00' }
    ],
    telefone: '(41) 3342-1190',
    observacao: 'Óleo de cozinha só em garrafa PET fechada, no máximo 5 litros por visita.',
    programa: 'Câmbio Verde',
    coordenadas: { lat: -25.4408, lng: -49.2869 }
  },
  {
    id: 'ecp-003',
    nome: 'Ponto de Entrega Água Verde',
    bairro: 'Água Verde',
    endereco: 'R. Brasílio Itiberê, 3300',
    materiais: ['vidro', 'metal', 'eletronico'],
    horarios: [
      { dias: 'Terça a domingo', abre: '07:00', fecha: '19:00' }
    ],
    telefone: '(41) 3243-7712',
    observacao: 'Vidro deve chegar limpo e sem tampa. Espelhos e vidros temperados não são aceitos.',
    programa: 'Ecocidadão',
    coordenadas: { lat: -25.4585, lng: -49.2761 }
  },
  {
    id: 'ecp-004',
    nome: 'Ecoponto Portão',
    bairro: 'Portão',
    endereco: 'R. João Bettega, 2100',
    materiais: ['papel', 'plastico', 'vidro', 'metal', 'eletronico', 'oleo'],
    horarios: [
      { dias: 'Segunda a sexta', abre: '07:00', fecha: '18:00' },
      { dias: 'Sábado', abre: '08:00', fecha: '14:00' }
    ],
    telefone: '(41) 3329-4455',
    observacao: 'Único ponto da lista que recebe os seis materiais. Fila costuma ser maior aos sábados.',
    programa: 'Lixo que Não é Lixo',
    coordenadas: { lat: -25.4791, lng: -49.3055 }
  },
  {
    id: 'ecp-005',
    nome: 'Coleta Solidária Cabral',
    bairro: 'Cabral',
    endereco: 'R. Nicarágua, 890',
    materiais: ['papel', 'plastico'],
    horarios: [
      { dias: 'Segunda a sexta', abre: '10:00', fecha: '17:00' }
    ],
    telefone: '(41) 3253-6021',
    observacao: 'Operado por associação de catadores. Papel picado deve vir ensacado.',
    programa: 'Ecocidadão',
    coordenadas: { lat: -25.4034, lng: -49.2545 }
  },
  {
    id: 'ecp-006',
    nome: 'Ecoponto Boqueirão',
    bairro: 'Boqueirão',
    endereco: 'Av. Marechal Floriano Peixoto, 8200',
    materiais: ['plastico', 'vidro', 'metal', 'eletronico'],
    horarios: [
      { dias: 'Segunda a sábado', abre: '08:00', fecha: '17:00' }
    ],
    telefone: '(41) 3376-2288',
    observacao: 'Eletrônicos de grande porte precisam de agendamento por telefone.',
    programa: 'Lixo que Não é Lixo',
    coordenadas: { lat: -25.4933, lng: -49.2372 }
  },
  {
    id: 'ecp-007',
    nome: 'Feira do Câmbio Verde Santa Felicidade',
    bairro: 'Santa Felicidade',
    endereco: 'R. Manoel Ribas, 5900 - praça da feira',
    materiais: ['papel', 'plastico', 'metal', 'oleo'],
    horarios: [
      { dias: 'Quinta-feira', abre: '08:00', fecha: '11:00' }
    ],
    telefone: '(41) 3372-9080',
    observacao: 'Ponto itinerante: troca 4 kg de recicláveis por 1 kg de alimento. Só funciona na quinta de manhã.',
    programa: 'Câmbio Verde',
    coordenadas: { lat: -25.4083, lng: -49.3355 }
  },
  {
    id: 'ecp-008',
    nome: 'Ponto Eletrônico Rebouças',
    bairro: 'Rebouças',
    endereco: 'R. Engenheiros Rebouças, 1250',
    materiais: ['eletronico'],
    horarios: [
      { dias: 'Segunda a sexta', abre: '09:00', fecha: '18:00' }
    ],
    telefone: '(41) 3222-5510',
    observacao: 'Exclusivo para lixo eletrônico: celulares, cabos, placas, pilhas e baterias.',
    programa: 'Ecocidadão',
    coordenadas: { lat: -25.4442, lng: -49.2618 }
  },
  {
    id: 'ecp-009',
    nome: 'Ecoponto Bigorrilho',
    bairro: 'Bigorrilho',
    endereco: 'R. Padre Anchieta, 2600',
    materiais: ['papel', 'vidro', 'metal'],
    horarios: [
      { dias: 'Segunda a sexta', abre: '08:00', fecha: '19:00' },
      { dias: 'Sábado', abre: '09:00', fecha: '13:00' }
    ],
    telefone: '(41) 3335-4102',
    observacao: 'Contêiner de vidro fica na calçada e é o único disponível fora do horário.',
    programa: 'Lixo que Não é Lixo',
    coordenadas: { lat: -25.4322, lng: -49.3021 }
  },
  {
    id: 'ecp-010',
    nome: 'Coleta de Óleo Cristo Rei',
    bairro: 'Cristo Rei',
    endereco: 'R. Fernando de Noronha, 1440',
    materiais: ['oleo', 'plastico'],
    horarios: [
      { dias: 'Segunda a sexta', abre: '08:00', fecha: '16:00' }
    ],
    telefone: '(41) 3362-7734',
    observacao: 'O óleo recolhido vira sabão na cooperativa do bairro. Traga a garrafa sem funil.',
    programa: 'Ecocidadão',
    coordenadas: { lat: -25.4407, lng: -49.2454 }
  },
  {
    id: 'ecp-011',
    nome: 'Ecoponto Pinheirinho',
    bairro: 'Pinheirinho',
    endereco: 'Av. Winston Churchill, 2033',
    materiais: ['papel', 'plastico', 'vidro', 'metal', 'oleo'],
    horarios: [
      { dias: 'Segunda a sábado', abre: '07:30', fecha: '17:30' }
    ],
    telefone: '(41) 3348-1177',
    observacao: 'Estacionamento interno para descarga. Fechado em feriados municipais.',
    programa: 'Lixo que Não é Lixo',
    coordenadas: { lat: -25.5183, lng: -49.2905 }
  },
  {
    id: 'ecp-012',
    nome: 'Ponto de Entrega Uberaba',
    bairro: 'Uberaba',
    endereco: 'R. Prof. Nivaldo Braga, 1490',
    materiais: ['plastico', 'metal', 'eletronico', 'oleo'],
    horarios: [
      { dias: 'Terça a sábado', abre: '09:00', fecha: '18:00' }
    ],
    telefone: '(41) 3266-8341',
    observacao: 'Pilhas e baterias em caixa separada, na entrada. Não recebe lâmpadas.',
    programa: 'Ecocidadão',
    coordenadas: { lat: -25.4762, lng: -49.2262 }
  }
];

module.exports = { pontos };
