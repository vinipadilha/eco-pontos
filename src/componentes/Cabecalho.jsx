import { Link } from 'react-router-dom';

export default function Cabecalho({ total }) {
  return (
    <header className="cabecalho">
      <Link className="cabecalho__marca" to="/">
        Eco<span>pontos</span>
      </Link>
      <p className="cabecalho__contexto">
        Curitiba
        {total !== null && <span className="cabecalho__contagem">{total} pontos ativos</span>}
      </p>
    </header>
  );
}
