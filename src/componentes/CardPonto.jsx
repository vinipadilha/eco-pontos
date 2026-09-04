import { Link } from 'react-router-dom';
import FaixaMateriais from './FaixaMateriais.jsx';
import { material } from '../lib/materiais.js';

export default function CardPonto({ ponto, posicao, aoEditar, aoRemover }) {
  const primeiroHorario = ponto.horarios?.[0];

  return (
    <li className="card-item" style={{ '--atraso': `${Math.min(posicao, 11) * 35}ms` }}>
      <article className="card">
        <Link className="card__link" to={`/ponto/${ponto._id}`}>
          <FaixaMateriais materiais={ponto.materiais} />
          <div className="card__corpo">
            <p className="card__bairro">{ponto.bairro}</p>
            <h2 className="card__nome">{ponto.nome}</h2>
            <p className="card__endereco">{ponto.endereco}</p>
            {primeiroHorario && (
              <p className="card__horario">
                {primeiroHorario.dias} · {primeiroHorario.abre}–{primeiroHorario.fecha}
              </p>
            )}
            <ul className="card__materiais">
              {ponto.materiais.map((id) => (
                <li key={id}>
                  <span className="ponto-cor" style={{ background: material(id)?.cor }} />
                  {material(id)?.nome || id}
                </li>
              ))}
            </ul>
          </div>
        </Link>
        <div className="card__acoes">
          <button type="button" onClick={() => aoEditar(ponto)}>
            Editar
          </button>
          <button type="button" onClick={() => aoRemover(ponto)}>
            Excluir
          </button>
        </div>
      </article>
    </li>
  );
}
