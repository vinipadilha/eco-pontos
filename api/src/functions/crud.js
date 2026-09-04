const { app } = require('@azure/functions');
const { ObjectId } = require('mongodb');
const { colecaoPontos, paraJson } = require('../db');

const json = (status, corpo) => ({ status, jsonBody: corpo });
const falha = (contexto, erro) => {
  contexto.error(erro);
  return json(500, { erro: erro.message });
};

// Aceita só os campos que a interface envia. Impede que alguém grave lixo
// na coleção mandando um corpo qualquer.
function saneia(corpo) {
  const materiais = Array.isArray(corpo.materiais) ? corpo.materiais : [];

  return {
    nome: String(corpo.nome || '').trim(),
    bairro: String(corpo.bairro || '').trim(),
    endereco: String(corpo.endereco || '').trim(),
    telefone: String(corpo.telefone || '').trim(),
    observacao: String(corpo.observacao || '').trim(),
    programa: String(corpo.programa || '').trim(),
    materiais: materiais.filter((m) => typeof m === 'string'),
    horarios: Array.isArray(corpo.horarios) ? corpo.horarios : []
  };
}

function validar(ponto) {
  if (!ponto.nome) return 'Informe o nome do ponto de coleta.';
  if (!ponto.bairro) return 'Informe o bairro.';
  if (!ponto.endereco) return 'Informe o endereço.';
  if (ponto.materiais.length === 0) return 'Selecione ao menos um material aceito.';
  return null;
}

// 1. PESQUISAR — GET /api/pesquisar?termo=
app.http('pesquisar', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'pesquisar',
  handler: async (requisicao, contexto) => {
    try {
      const termo = (requisicao.query.get('termo') || '').trim();
      const material = (requisicao.query.get('material') || '').trim();
      const filtro = {};

      if (termo) {
        filtro.$or = [
          { nome: { $regex: termo, $options: 'i' } },
          { bairro: { $regex: termo, $options: 'i' } }
        ];
      }

      if (material) {
        filtro.materiais = material;
      }

      const colecao = await colecaoPontos();
      const pontos = await colecao.find(filtro).sort({ nome: 1 }).toArray();

      return json(200, { total: pontos.length, pontos: pontos.map(paraJson) });
    } catch (erro) {
      return falha(contexto, erro);
    }
  }
});

// 2. INSERIR — POST /api/inserir
app.http('inserir', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'inserir',
  handler: async (requisicao, contexto) => {
    try {
      const ponto = saneia(await requisicao.json());
      const invalido = validar(ponto);

      if (invalido) return json(400, { erro: invalido });

      const colecao = await colecaoPontos();
      const resultado = await colecao.insertOne({ ...ponto, criadoEm: new Date() });

      return json(201, { id: resultado.insertedId.toString(), ponto });
    } catch (erro) {
      return falha(contexto, erro);
    }
  }
});

// 3. ALTERAR — PUT /api/alterar/{id}
app.http('alterar', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  route: 'alterar/{id}',
  handler: async (requisicao, contexto) => {
    try {
      const { id } = requisicao.params;

      if (!ObjectId.isValid(id)) return json(400, { erro: 'Id inválido.' });

      const ponto = saneia(await requisicao.json());
      const invalido = validar(ponto);

      if (invalido) return json(400, { erro: invalido });

      const colecao = await colecaoPontos();
      const resultado = await colecao.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...ponto, alteradoEm: new Date() } }
      );

      if (resultado.matchedCount === 0) {
        return json(404, { erro: 'Ponto de coleta não encontrado.' });
      }

      return json(200, { id, alterados: resultado.modifiedCount });
    } catch (erro) {
      return falha(contexto, erro);
    }
  }
});

// 4. EXCLUIR — DELETE /api/excluir/{id}
app.http('excluir', {
  methods: ['DELETE'],
  authLevel: 'anonymous',
  route: 'excluir/{id}',
  handler: async (requisicao, contexto) => {
    try {
      const { id } = requisicao.params;

      if (!ObjectId.isValid(id)) return json(400, { erro: 'Id inválido.' });

      const colecao = await colecaoPontos();
      const resultado = await colecao.deleteOne({ _id: new ObjectId(id) });

      if (resultado.deletedCount === 0) {
        return json(404, { erro: 'Ponto de coleta não encontrado.' });
      }

      return json(200, { id });
    } catch (erro) {
      return falha(contexto, erro);
    }
  }
});
