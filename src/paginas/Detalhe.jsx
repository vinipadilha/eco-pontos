import { Link, useParams } from 'react-router-dom';
import { material } from '../lib/materiais.js';
import NaoEncontrado from './NaoEncontrado.jsx';

export default function Detalhe({ pontos, estado }) {
  const { id } = useParams();
  const ponto = pontos.find((item) => item._id === id);

  if (estado === 'carregando') {
    return <p className="aviso">Carregando o ponto de coleta…</p>;
  }

  if (!ponto) {
    return <NaoEncontrado />;
  }

  return (
    <article className="detalhe">
      <Link className="voltar" to="/">
        Todos os pontos
      </Link>

      <header className="detalhe__topo">
        <p className="detalhe__bairro">{ponto.bairro}</p>
        <h1 className="detalhe__nome">{ponto.nome}</h1>
        {ponto.programa && <p className="detalhe__programa">{ponto.programa}</p>}
      </header>

      <section className="aceitos">
        <h2 className="secao__titulo">O que este ponto recebe</h2>
        <ul className="aceitos__lista">
          {ponto.materiais.map((idMaterial) => {
            const item = material(idMaterial);

            return (
              <li key={idMaterial} className="aceito" style={{ '--cor': item.cor, '--tinta': item.textoSobreCor }}>
                <span className="aceito__nome">{item.nome}</span>
                <span className="aceito__detalhe">{item.aceita}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="detalhe__colunas">
        <section>
          <h2 className="secao__titulo">Onde fica</h2>
          <p className="detalhe__endereco">{ponto.endereco}</p>
          <p className="detalhe__endereco">{ponto.bairro}, Curitiba — PR</p>
          <dl className="dados">
            <div>
              <dt>Telefone</dt>
              <dd>{ponto.telefone}</dd>
            </div>
            <div>
              <dt>Id no MongoDB</dt>
              <dd>
                {ponto._id}
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="secao__titulo">Horários</h2>
          <ul className="horarios">
            {(ponto.horarios || []).map((horario) => (
              <li key={horario.dias}>
                <span className="horarios__dias">{horario.dias}</span>
                <span className="horarios__faixa">
                  {horario.abre} — {horario.fecha}
                </span>
              </li>
            ))}
          </ul>
          <h2 className="secao__titulo secao__titulo--espacado">Antes de ir</h2>
          <p className="detalhe__observacao">{ponto.observacao}</p>
        </section>
      </div>
    </article>
  );
}
