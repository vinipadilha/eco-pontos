// Único ponto de contato com a Azure Function.
// Em produção o endpoint mora no mesmo domínio do Static Web Apps (/api/pontos),
// então não há CORS nem URL de ambiente para configurar.
export async function buscarPontos() {
  const resposta = await fetch('/api/pontos');

  if (!resposta.ok) {
    throw new Error(`A API respondeu ${resposta.status}`);
  }

  const dados = await resposta.json();
  return dados.pontos;
}
