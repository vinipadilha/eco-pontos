import { useMemo, useState } from 'react';
import SeletorMateriais from '../componentes/SeletorMateriais.jsx';
import CardPonto from '../componentes/CardPonto.jsx';
import { ORDEM_MATERIAIS, material } from '../lib/materiais.js';

export default function Catalogo({ pontos, estado, erro, aoTentarNovamente }) {
  const [selecionado, setSelecionado] = useState(null);
  const [busca, setBusca] = useState('');

  const contagens = useMemo(() => {
    const total = Object.fromEntries(ORDEM_MATERIAIS.map((id) => [id, 0]));
    pontos.forEach((ponto) => ponto.materiais.forEach((id) => { total[id] += 1; }));
    return total;
  }, [pontos]);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return pontos.filter((ponto) => {
      const combinaMaterial = !selecionado || ponto.materiais.includes(selecionado);
      const combinaBusca =
        !termo ||
        ponto.bairro.toLowerCase().includes(termo) ||
        ponto.nome.toLowerCase().includes(termo);

      return combinaMaterial && combinaBusca;
    });
  }, [pontos, selecionado, busca]);

  const escolhido = selecionado ? material(selecionado) : null;

  return (
    <div className="catalogo" style={escolhido ? { '--destaque': escolhido.cor } : undefined}>
      <section className="abertura">
        <p className="abertura__olho">Coleta seletiva de Curitiba</p>
        <h1 className="abertura__titulo">O que você vai descartar?</h1>
        <SeletorMateriais selecionado={selecionado} aoSelecionar={setSelecionado} contagens={contagens} />
        {escolhido && (
          <div className="escolha">
            <p className="escolha__texto">
              <strong>Vai:</strong> {escolhido.aceita} <strong>Não vai:</strong> {escolhido.recusa}
            </p>
            <button type="button" className="botao-texto" onClick={() => setSelecionado(null)}>
              Limpar seleção
            </button>
          </div>
        )}
      </section>

      <section className="resultados">
        <div className="resultados__barra">
          <h2 className="resultados__titulo">
            {estado === 'pronto' ? `${filtrados.length} ${filtrados.length === 1 ? 'ponto' : 'pontos'}` : 'Pontos de coleta'}
            {escolhido && <span className="resultados__recorte">que recebem {escolhido.nome.toLowerCase()}</span>}
          </h2>
          <label className="campo">
            <span className="campo__rotulo">Buscar por bairro</span>
            <input
              type="search"
              value={busca}
              placeholder="Batel, Portão, Uberaba…"
              onChange={(evento) => setBusca(evento.target.value)}
            />
          </label>
        </div>

        {estado === 'carregando' && <p className="aviso">Carregando os pontos de coleta…</p>}

        {estado === 'erro' && (
          <div className="aviso aviso--erro">
            <p>Não foi possível falar com a API dos pontos de coleta.</p>
            <p className="aviso__detalhe">{erro}</p>
            <button type="button" className="botao" onClick={aoTentarNovamente}>
              Tentar novamente
            </button>
          </div>
        )}

        {estado === 'pronto' && filtrados.length === 0 && (
          <div className="aviso">
            <p>Nenhum ponto combina com esses critérios.</p>
            <button
              type="button"
              className="botao"
              onClick={() => {
                setSelecionado(null);
                setBusca('');
              }}
            >
              Ver todos os pontos
            </button>
          </div>
        )}

        {estado === 'pronto' && filtrados.length > 0 && (
          <ul className="grade">
            {filtrados.map((ponto, indice) => (
              <CardPonto key={ponto.id} ponto={ponto} posicao={indice} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
