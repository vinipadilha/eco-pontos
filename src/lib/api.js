// Contato com as 4 Azure Functions. Em produção elas ficam no mesmo domínio do
// Static Web Apps, então não há CORS nem URL de ambiente para configurar.
const BASE = '/api';

async function pedir(caminho, opcoes) {
  const resposta = await fetch(`${BASE}${caminho}`, opcoes);
  const corpo = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(corpo.erro || `A API respondeu ${resposta.status}`);
  }

  return corpo;
}

const comCorpo = (metodo, dados) => ({
  method: metodo,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dados)
});

export async function pesquisarPontos(termo = '') {
  const busca = termo ? `?termo=${encodeURIComponent(termo)}` : '';
  const dados = await pedir(`/pesquisar${busca}`);
  return dados.pontos;
}

export const inserirPonto = (ponto) => pedir('/inserir', comCorpo('POST', ponto));

export const alterarPonto = (id, ponto) => pedir(`/alterar/${id}`, comCorpo('PUT', ponto));

export const excluirPonto = (id) => pedir(`/excluir/${id}`, { method: 'DELETE' });
