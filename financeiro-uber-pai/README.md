# Controle Financeiro — Motorista de App

## Motivação

Criei esse site pois meu pai é um motorista de aplicativo, e sempre via ele anotando todos os gastos e valores ganhos no dia a dia do trabalho em um caderninho que ele levava com ele. Com isso enxerguei uma oportunidade de facilitar o trabalho dele, criando um site onde ele pode apenas digitar os valores ganhos e de despesas e os cálculos serão feitos de forma automática e ficarão salvos para ele acessar quando quiser. 

## Funcionalidades

- Formulário para lançar o valor ganho, horas trabalhadas e quantidade de corridas do dia
- Formulário para registrar gastos feitos durante ou derivados do trabalho
- Aba **Resumo**: totais do mês atual (ganho, gasto, horas trabalhadas, saldo e dízimo), resetada automaticamente todo dia 1
- Aba **Histórico**: consulta os totais de meses anteriores, já que o Resumo é sempre referente ao mês corrente
- Edição de lançamentos: possibilidade de excluir um lançamento feito com erro e relançar

## Tecnologias utilizadas

- React (JSX)
- Vite
- CSS
- JavaScript
- Node.js
- Supabase (banco de dados)
- Vercel (deploy)
- Git / GitHub

## Aprendizados

Essa foi minha primeira experiência construindo algo de verdade, depois de muito tempo apenas assistindo aulas — decidi colocar a mão na massa. Ao longo do projeto, aprendi:

- Como conectar o frontend ao backend, usando Node e Supabase
- A organizar o código de forma que facilite a compreensão, para identificar e corrigir erros com mais facilidade
- A versionar bem o código com Git/GitHub, fazendo commits a cada nova adição, mantendo um bom histórico do desenvolvimento
- React na prática — era minha primeira experiência com a biblioteca, e minha familiaridade prévia com JavaScript ajudou bastante no processo
- Utilizar a programação para resolver um problema real, aprendi com essa experiência a sempre estar antenado as coisas a minha volta e sempre pensar em como eu poderia resolver-las utilizando a programação.

## Sobre o acesso

Este projeto está em uso real pela minha família, então o link de produção e os dados não são públicos. Você pode rodar o projeto localmente seguindo as instruções abaixo (será necessário criar seu próprio banco de dados no Supabase).

## Como rodar localmente

1. Clone o repositório: `git clone https://github.com/seu-usuario/controle-financeiro-uber.git`
2. Instale as dependências: `npm install`
3. Crie um arquivo `.env` na raiz com suas credenciais do Supabase:
```
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_KEY=sua_chave_aqui
```
4. Rode o projeto: `npm run dev`