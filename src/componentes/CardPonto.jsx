import { Link } from 'react-router-dom';
import FaixaMateriais from './FaixaMateriais.jsx';
import { material } from '../lib/materiais.js';

export default function CardPonto({ ponto, posicao }) {
  const primeiroHorario = ponto.horarios[0];

  return (
    <li className="card-item" style={{ '--atraso': `${Math.min(posicao, 11) * 35}ms` }}>
      <Link className="card" to={`/ponto/${ponto.id}`}>
        <FaixaMateriais materiais={ponto.materiais} />
        <div className="card__corpo">
          <p className="card__bairro">{ponto.bairro}</p>
          <h2 className="card__nome">{ponto.nome}</h2>
          <p className="card__endereco">{ponto.endereco}</p>
          <p className="card__horario">
            {primeiroHorario.dias} · {primeiroHorario.abre}–{primeiroHorario.fecha}
            {ponto.horarios.length > 1 && <span className="card__mais"> +1 horário</span>}
          </p>
          <ul className="card__materiais">
            {ponto.materiais.map((id) => (
              <li key={id}>
                <span className="ponto-cor" style={{ background: material(id).cor }} />
                {material(id).nome}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </li>
  );
}
