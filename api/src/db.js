const { MongoClient } = require('mongodb');

// Uma única conexão reaproveitada entre invocações. Em serverless, abrir um
// client por request estoura o limite de conexões do Atlas em minutos.
let clientPromise;

function conectar() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('A variável de ambiente MONGODB_URI não foi configurada.');
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }

  return clientPromise;
}

async function colecaoPontos() {
  const conexao = await conectar();
  return conexao.db('ecopontos_db').collection('pontos');
}

// O Mongo devolve _id como ObjectId; o frontend trabalha com string.
function paraJson(documento) {
  return { ...documento, _id: documento._id.toString() };
}

module.exports = { colecaoPontos, paraJson };
