# Documentação do Projeto Node.js + Express

Este projeto é uma aplicação web construída com Node.js e Express, projetada para servir como um tutorial ou ponto de partida para o desenvolvimento de APIs RESTful. A aplicação inclui funcionalidades de autenticação, manipulação de mensagens e gerenciamento de tarefas, utilizando um banco de dados PostgreSQL para persistência de dados.

O objetivo deste documento é fornecer uma visão detalhada da arquitetura, módulos e funcionalidades do projeto para desenvolvedores que darão continuidade ao seu desenvolvimento.

## Módulos Utilizados

A seguir, uma descrição dos principais módulos utilizados no projeto, conforme `package.json`:

- **Express**: Framework web para Node.js, utilizado para criar o servidor e gerenciar as rotas da API.
- **Sequelize**: ORM (Object-Relational Mapper) para Node.js, que facilita a interação com o banco de dados PostgreSQL.
- **PostgreSQL (pg)**: Driver do banco de dados PostgreSQL para Node.js.
- **JSON Web Token (jsonwebtoken)**: Utilizado para gerar e verificar tokens de autenticação, garantindo a segurança das rotas.
- **Bcrypt**: Biblioteca para criptografar senhas antes de armazená-las no banco de dados.
- **Dotenv**: Carrega variáveis de ambiente de um arquivo `.env` para `process.env`, facilitando o gerenciamento de configurações.
- **Babel**: Transpilador de JavaScript que permite o uso de funcionalidades mais recentes do ECMAScript (ES6+).
- **Nodemon**: Ferramenta que reinicia automaticamente o servidor durante o desenvolvimento.
- **CORS**: Middleware para habilitar o Cross-Origin Resource Sharing.
- **Joi**: Biblioteca para validação de esquemas de dados.
- **Express Rate Limit**: Middleware para limitar a taxa de requisições à API.

## Arquitetura da Aplicação

A aplicação segue uma arquitetura modular, com o código organizado nos seguintes diretórios dentro de `api/`:

- **controllers**: Contém a lógica de negócio da aplicação (ex: `userController.js`, `authController.js`).
- **middleware**: Contém middlewares do Express para tarefas como autenticação e tratamento de erros.
- **models**: Define os modelos do Sequelize, que representam as tabelas do banco de dados.
- **routes**: Define as rotas da API (ex: `user.js`, `auth.js`).
- **services**: Contém a lógica de interação com serviços externos.
- **utils**: Contém funções utilitárias.

## Como Executar o Projeto

1. **Clone o repositório e instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   - Renomeie o arquivo `.env.sample` para `.env`.
   - Preencha o arquivo `.env` com as informações do banco de dados e o segredo do JWT.

3. **Inicie o servidor:**
   ```bash
   npm start
   ```
O servidor será iniciado na porta definida no arquivo `.env` (padrão: 3000).
