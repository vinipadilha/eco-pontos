const { app } = require('@azure/functions');
const { pontos } = require('../dados');

// GET /api/pontos
// Devolve todos os pontos de coleta cadastrados. Os dados são mock: ficam no
// próprio código da Function, sem banco de dados por trás.
app.http('pontos', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'pontos',
  handler: async (request, context) => {
    context.log(`Consulta aos pontos de coleta vinda de ${request.url}`);

    return {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300'
      },
      jsonBody: {
        total: pontos.length,
        cidade: 'Curitiba',
        atualizadoEm: '2026-09-03',
        pontos
      }
    };
  }
});
