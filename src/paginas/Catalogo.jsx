import { useMemo, useState } from 'react';
import SeletorMateriais from '../componentes/SeletorMateriais.jsx';
import CardPonto from '../componentes/CardPonto.jsx';
import FormularioPonto from '../componentes/FormularioPonto.jsx';
import { ORDEM_MATERIAIS, material } from '../lib/materiais.js';

export default function Catalogo({ pontos, estado, erro, aoBuscar, aoCriar, aoEditar, aoRemover }) {
  const [selecionado, setSelecionado] = useState(null);
  const [busca, setBusca] = useState('');
  const [formulario, setFormulario] = useState(null);
  const [salvando, setSalvando] = useState(false);

  const contagens = useMemo(() => {
    const total = Object.fromEntries(ORDEM_MATERIAIS.map((id) => [id, 0]));
    pontos.forEach((ponto) => ponto.materiais.forEach((id) => { total[id] = (total[id] || 0) + 1; }));
    return total;
  }, [pontos]);

  const filtrados = useMemo(
    () => (selecionado ? pontos.filter((p) => p.materiais.includes(selecionado)) : pontos),
    [pontos, selecionado]
  );

  const escolhido = selecionado ? material(selecionado) : null;

  const enviarBusca = (evento) => {
    evento.preventDefault();
    aoBuscar(busca);
  };

  const salvar = async (dados) => {
    setSalvando(true);

    try {
      if (formulario === 'novo') {
        await aoCriar(dados);
      } else {
        await aoEditar(formulario._id, dados);
      }
      setFormulario(null);
    } finally {
      setSalvando(false);
    }
  };

  const remover = async (ponto) => {
    if (window.confirm(`Excluir "${ponto.nome}"? Esta ação não pode ser desfeita.`)) {
      await aoRemover(ponto._id);
    }
  };

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
            {estado === 'pronto'
              ? `${filtrados.length} ${filtrados.length === 1 ? 'ponto' : 'pontos'}`
              : 'Pontos de coleta'}
            {escolhido && <span className="resultados__recorte">que recebem {escolhido.nome.toLowerCase()}</span>}
          </h2>

          <div className="resultados__ferramentas">
            <form className="campo" onSubmit={enviarBusca}>
              <span className="campo__rotulo">Buscar por nome ou bairro</span>
              <span className="campo__grupo">
                <input
                  type="search"
                  value={busca}
                  placeholder="Batel, Portão, Uberaba…"
                  onChange={(evento) => setBusca(evento.target.value)}
                />
                <button type="submit" className="botao botao--discreto">Buscar</button>
              </span>
            </form>
            <button type="button" className="botao" onClick={() => setFormulario('novo')}>
              Adicionar ponto
            </button>
          </div>
        </div>

        {formulario && (
          <FormularioPonto
            inicial={formulario === 'novo' ? null : formulario}
            aoSalvar={salvar}
            aoCancelar={() => setFormulario(null)}
            salvando={salvando}
          />
        )}

        {estado === 'carregando' && <p className="aviso">Carregando os pontos de coleta…</p>}

        {estado === 'erro' && (
          <div className="aviso aviso--erro">
            <p>Não foi possível falar com a API dos pontos de coleta.</p>
            <p className="aviso__detalhe">{erro}</p>
            <button type="button" className="botao" onClick={() => aoBuscar(busca)}>
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
                aoBuscar('');
              }}
            >
              Ver todos os pontos
            </button>
          </div>
        )}

        {estado === 'pronto' && filtrados.length > 0 && (
          <ul className="grade">
            {filtrados.map((ponto, indice) => (
              <CardPonto
                key={ponto._id}
                ponto={ponto}
                posicao={indice}
                aoEditar={setFormulario}
                aoRemover={remover}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
