import { useState } from 'react';
import { listaMateriais } from '../lib/materiais.js';

const vazio = {
  nome: '',
  bairro: '',
  endereco: '',
  telefone: '',
  observacao: '',
  programa: '',
  materiais: [],
  horarios: [{ dias: 'Segunda a sexta', abre: '08:00', fecha: '18:00' }]
};

export default function FormularioPonto({ inicial, aoSalvar, aoCancelar, salvando }) {
  const [dados, setDados] = useState(() => ({ ...vazio, ...(inicial || {}) }));
  const [erro, setErro] = useState('');

  const campo = (nome) => ({
    value: dados[nome],
    onChange: (evento) => setDados({ ...dados, [nome]: evento.target.value })
  });

  const horario = dados.horarios[0] || vazio.horarios[0];
  const mudarHorario = (chave, valor) =>
    setDados({ ...dados, horarios: [{ ...horario, [chave]: valor }] });

  const alternarMaterial = (id) =>
    setDados({
      ...dados,
      materiais: dados.materiais.includes(id)
        ? dados.materiais.filter((m) => m !== id)
        : [...dados.materiais, id]
    });

  const enviar = async (evento) => {
    evento.preventDefault();
    setErro('');

    try {
      await aoSalvar(dados);
    } catch (falha) {
      setErro(falha.message);
    }
  };

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2 className="formulario__titulo">
        {inicial ? 'Editar ponto de coleta' : 'Novo ponto de coleta'}
      </h2>

      <div className="formulario__linha">
        <label className="campo">
          <span className="campo__rotulo">Nome</span>
          <input {...campo('nome')} required placeholder="Ecoponto Centro Cívico" />
        </label>
        <label className="campo">
          <span className="campo__rotulo">Bairro</span>
          <input {...campo('bairro')} required placeholder="Centro Cívico" />
        </label>
      </div>

      <label className="campo">
        <span className="campo__rotulo">Endereço</span>
        <input {...campo('endereco')} required placeholder="R. Mateus Leme, 1820" />
      </label>

      <fieldset className="formulario__materiais">
        <legend className="campo__rotulo">Materiais aceitos</legend>
        <div className="escolhas">
          {listaMateriais().map((item) => {
            const marcado = dados.materiais.includes(item.id);

            return (
              <label
                key={item.id}
                className={`escolha-material${marcado ? ' escolha-material--marcada' : ''}`}
                style={{ '--cor': item.cor, '--tinta': item.textoSobreCor }}
              >
                <input
                  type="checkbox"
                  checked={marcado}
                  onChange={() => alternarMaterial(item.id)}
                />
                {item.nome}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="formulario__linha">
        <label className="campo">
          <span className="campo__rotulo">Dias</span>
          <input
            value={horario.dias}
            onChange={(e) => mudarHorario('dias', e.target.value)}
            placeholder="Segunda a sexta"
          />
        </label>
        <label className="campo">
          <span className="campo__rotulo">Abre</span>
          <input value={horario.abre} onChange={(e) => mudarHorario('abre', e.target.value)} />
        </label>
        <label className="campo">
          <span className="campo__rotulo">Fecha</span>
          <input value={horario.fecha} onChange={(e) => mudarHorario('fecha', e.target.value)} />
        </label>
      </div>

      <div className="formulario__linha">
        <label className="campo">
          <span className="campo__rotulo">Telefone</span>
          <input {...campo('telefone')} placeholder="(41) 3350-8484" />
        </label>
        <label className="campo">
          <span className="campo__rotulo">Programa</span>
          <input {...campo('programa')} placeholder="Lixo que Não é Lixo" />
        </label>
      </div>

      <label className="campo">
        <span className="campo__rotulo">Antes de ir</span>
        <textarea {...campo('observacao')} rows={2} placeholder="Recebe grandes volumes de papelão." />
      </label>

      {erro && <p className="formulario__erro">{erro}</p>}

      <div className="formulario__acoes">
        <button type="submit" className="botao" disabled={salvando}>
          {salvando ? 'Salvando…' : inicial ? 'Salvar alterações' : 'Cadastrar ponto'}
        </button>
        <button type="button" className="botao-texto botao-texto--escuro" onClick={aoCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
