# EcoPontos

Onde descartar cada material em Curitiba. Frontend em React consumindo uma Azure
Function com dados mock, publicado no Azure Static Web Apps.

Projeto acadêmico — PJBL. Integrantes em [GRUPO.md](GRUPO.md), prompts de IA
generativa em [Prompt.md](Prompt.md).

## Endereços

| O quê | Endereço |
| --- | --- |
| Site publicado (Azure Static Web Apps) | `PREENCHER APÓS O DEPLOY` |
| Endpoint da Azure Function (GET) | `PREENCHER APÓS O DEPLOY` + `/api/pontos` |

O mock **não** usa Apidog: os dados ficam no código da própria Azure Function
(`api/src/dados.js`), sem serviço externo nem banco de dados.

## O que o projeto faz

Duas telas:

1. **Catálogo** (`/`) — os 12 pontos de coleta, filtráveis pelo material que se
   quer descartar e por busca de bairro.
2. **Detalhe** (`/ponto/:id`) — endereço, telefone, horários, materiais aceitos e
   orientações do ponto escolhido.

### O sistema de cores

A interface adota a **Resolução CONAMA 275/2001**, que padroniza a identificação
de resíduos na coleta seletiva brasileira:

| Cor | Material |
| --- | --- |
| Azul | Papel |
| Vermelho | Plástico |
| Verde | Vidro |
| Amarelo | Metal |
| Laranja | Eletrônicos e resíduos perigosos |
| Marrom | Orgânicos e óleo de cozinha |

A cor não é decoração: é como cada ponto anuncia o que recebe. As faixas no topo
de cada card permitem varrer a lista sem ler texto.

## A API

Uma única rota, sem autenticação:

```
GET /api/pontos
```

```json
{
  "total": 12,
  "cidade": "Curitiba",
  "atualizadoEm": "2026-09-03",
  "pontos": [
    {
      "id": "ecp-001",
      "nome": "Ecoponto Centro Cívico",
      "bairro": "Centro Cívico",
      "endereco": "R. Mateus Leme, 1820",
      "materiais": ["papel", "plastico", "vidro", "metal"],
      "horarios": [{ "dias": "Segunda a sexta", "abre": "08:00", "fecha": "18:00" }],
      "telefone": "(41) 3350-8484",
      "observacao": "Recebe grandes volumes de papelão desmontado…",
      "programa": "Lixo que Não é Lixo",
      "coordenadas": { "lat": -25.4152, "lng": -49.2712 }
    }
  ]
}
```

A Function usa o modelo de programação v4 do Azure Functions para Node.js e roda
como *managed function* do Static Web Apps — mesmo domínio do site, portanto sem
CORS e sem URL de ambiente no frontend.

## Estrutura

```
.
├── api/                      Azure Functions (managed functions do SWA)
│   ├── src/dados.js          os 12 pontos mock
│   ├── src/functions/pontos.js   GET /api/pontos
│   └── src/index.js
├── src/
│   ├── lib/materiais.js      paleta CONAMA 275
│   ├── lib/api.js            único ponto de contato com a Function
│   ├── componentes/
│   ├── paginas/
│   └── estilos.css
├── staticwebapp.config.json  rotas SPA e runtime da API
├── GRUPO.md
├── Prompt.md
└── README.md
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:5173. Não é preciso instalar o Azure Functions Core
Tools: em desenvolvimento, um plugin do Vite (`vite.config.js`) responde a
`/api/pontos` lendo exatamente o mesmo `api/src/dados.js` que a Function usa em
produção.

Para gerar o build de produção:

```bash
npm run build
```

## Publicando no Azure Static Web Apps

1. No portal do Azure, criar um recurso **Static Web App** e escolher **GitHub**
   como origem, apontando para este repositório e a branch `main`.
2. Em *Build Details*, usar o preset **React** e preencher:
   - App location: `/`
   - Api location: `api`
   - Output location: `dist`
3. O Azure cria o workflow em `.github/workflows/` e o primeiro deploy roda
   sozinho. A cada `git push` na `main` o site é republicado.
4. Copiar a URL gerada para a tabela **Endereços** no topo deste arquivo.
