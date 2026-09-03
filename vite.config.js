import { createRequire } from 'node:module';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Em produção, /api/pontos é servido pela Azure Function do Static Web Apps.
// No `npm run dev` não há Functions rodando, então este plugin responde ao
// mesmo endpoint lendo exatamente os mesmos dados que a Function usa.
function apiLocal() {
  return {
    name: 'ecopontos-api-local',
    configureServer(servidor) {
      servidor.middlewares.use('/api/pontos', (requisicao, resposta) => {
        const require = createRequire(import.meta.url);
        const caminho = require.resolve('./api/src/dados.js');
        delete require.cache[caminho];
        const { pontos } = require(caminho);

        resposta.setHeader('Content-Type', 'application/json; charset=utf-8');
        resposta.end(
          JSON.stringify({ total: pontos.length, cidade: 'Curitiba', atualizadoEm: '2026-09-03', pontos })
        );
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiLocal()]
});
