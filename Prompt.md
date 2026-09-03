# Prompt utilizado

Ferramenta de IA generativa: **Claude (Claude Code)**.

O frontend não saiu de um único prompt: foi construído em conversa, com decisões
tomadas em etapas. Abaixo estão os prompts reais, na ordem em que foram usados.

## 1. Contexto e escolha do tema

> Enviei ao Claude o print com os requisitos da atividade (PJBL, frontend
> consumindo Azure Functions com dados mock, mínimo duas telas, publicação no
> Azure Static Web Apps, arquivos GRUPO.md / Prompt.md / Readme.MD) e pedi
> sugestão de tema. Ele propôs três; escolhemos o EcoPontos: catálogo de pontos
> de coleta de recicláveis com filtro por material.

## 2. Definição da stack

> "React + Vite para o frontend. O mock deve vir da própria Azure Function
> (array hardcoded), sem serviço externo."

## 3. Direção visual

> "Não quero um visual genérico de 'app ecológico'. Derive a identidade do
> próprio assunto."

A resposta que adotamos: usar a **Resolução CONAMA 275/2001** — o código de cores
oficial da coleta seletiva no Brasil (azul = papel, vermelho = plástico,
verde = vidro, amarelo = metal, laranja = eletrônicos e perigosos,
marrom = orgânicos e óleo) — como sistema de cores da interface inteira. A cor
deixa de ser decoração e passa a ser a informação.

## 4. Construção

> "Monte o projeto: Vite + React + React Router, uma Azure Function em Node.js
> (modelo de programação v4) expondo GET /api/pontos com 12 pontos de coleta
> mock em Curitiba, tela de catálogo com filtro por material e busca por bairro,
> tela de detalhe em /ponto/:id, tratamento de carregando / erro / vazio,
> responsivo, foco visível pelo teclado e prefers-reduced-motion respeitado."

## O que foi gerado pela IA e o que foi decidido pelo grupo

- **Decidido pelo grupo:** tema, stack, escopo das telas, uso da CONAMA 275 como
  base do design, cidade e conteúdo dos dados mock.
- **Gerado pela IA:** o código do frontend e da Function, o CSS, os textos de
  interface e os dados fictícios dos 12 pontos.
- **Revisado pelo grupo:** build, comportamento das duas telas no navegador e
  resposta do endpoint antes da publicação.
