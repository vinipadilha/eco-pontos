import { material } from '../lib/materiais.js';

// Cada material aceito vira uma faixa da sua cor CONAMA. É o que permite
// varrer o grid inteiro sem ler nenhum texto.
export default function FaixaMateriais({ materiais }) {
  return (
    <div className="faixa" role="img" aria-label={`Aceita ${materiais.map((id) => material(id).nome).join(', ')}`}>
      {materiais.map((id) => (
        <span key={id} className="faixa__parte" style={{ background: material(id).cor }} />
      ))}
    </div>
  );
}
