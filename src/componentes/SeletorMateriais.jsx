import { listaMateriais } from '../lib/materiais.js';

// O filtro é a fileira de lixeiras. Você escolhe o que vai descartar, e não
// "uma categoria": a pergunta é a mesma que a pessoa faz em casa, na frente do lixo.
export default function SeletorMateriais({ selecionado, aoSelecionar, contagens }) {
  return (
    <ul className="lixeiras">
      {listaMateriais().map((item) => {
        const ativo = selecionado === item.id;
        const quantidade = contagens[item.id] ?? 0;

        return (
          <li key={item.id}>
            <button
              type="button"
              className={`lixeira${ativo ? ' lixeira--ativa' : ''}`}
              style={{ '--cor': item.cor, '--tinta': item.textoSobreCor }}
              aria-pressed={ativo}
              onClick={() => aoSelecionar(ativo ? null : item.id)}
            >
              <span className="lixeira__codigo">CONAMA · {item.corNome}</span>
              <span className="lixeira__nome">{item.nome}</span>
              <span className="lixeira__contagem">{quantidade} pontos</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
