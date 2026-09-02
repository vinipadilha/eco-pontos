import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { buscarPontos } from './lib/api.js';
import Cabecalho from './componentes/Cabecalho.jsx';
import Rodape from './componentes/Rodape.jsx';
import Catalogo from './paginas/Catalogo.jsx';
import Detalhe from './paginas/Detalhe.jsx';
import NaoEncontrado from './paginas/NaoEncontrado.jsx';

export default function App() {
  const [pontos, setPontos] = useState([]);
  const [estado, setEstado] = useState('carregando');
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    setEstado('carregando');
    setErro('');

    try {
      setPontos(await buscarPontos());
      setEstado('pronto');
    } catch (falha) {
      setErro(falha.message);
      setEstado('erro');
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return (
    <>
      <Cabecalho total={estado === 'pronto' ? pontos.length : null} />
      <main id="conteudo">
        <Routes>
          <Route
            path="/"
            element={<Catalogo pontos={pontos} estado={estado} erro={erro} aoTentarNovamente={carregar} />}
          />
          <Route path="/ponto/:id" element={<Detalhe pontos={pontos} estado={estado} />} />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>
      <Rodape />
    </>
  );
}
