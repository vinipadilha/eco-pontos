// Popula a coleção com os 12 pontos iniciais. Roda uma vez:
//   MONGODB_URI="sua-string" node api/seed.js
const { MongoClient } = require('mongodb');
const { pontos } = require('./src/dados');

(async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Defina MONGODB_URI antes de rodar o seed.');
    process.exit(1);
  }

  const cliente = await new MongoClient(uri).connect();

  try {
    const colecao = cliente.db('ecopontos_db').collection('pontos');
    const existentes = await colecao.countDocuments();

    if (existentes > 0) {
      console.log(`A coleção já tem ${existentes} pontos. Nada a fazer.`);
      return;
    }

    const documentos = pontos.map(({ id, coordenadas, ...resto }) => ({
      ...resto,
      criadoEm: new Date()
    }));

    const resultado = await colecao.insertMany(documentos);
    console.log(`${resultado.insertedCount} pontos inseridos em ecopontos_db.pontos`);
  } finally {
    await cliente.close();
  }
})();
