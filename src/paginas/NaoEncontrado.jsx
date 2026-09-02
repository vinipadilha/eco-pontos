import { Link } from 'react-router-dom';

export default function NaoEncontrado() {
  return (
    <div className="aviso">
      <p>Esse ponto de coleta não está na lista.</p>
      <Link className="botao" to="/">
        Ver todos os pontos
      </Link>
    </div>
  );
}
