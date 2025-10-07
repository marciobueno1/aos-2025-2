# Resumo das Alterações de Autenticação com JWT

Este documento resume as alterações feitas no projeto para implementar um sistema de autenticação completo, incluindo cadastro, login e logout, utilizando JSON Web Tokens (JWT).

## Objetivo

O objetivo principal foi adicionar um sistema de autenticação seguro e moderno, permitindo que os usuários se cadastrem, façam login para obter um token de acesso e usem esse token para acessar rotas protegidas.

## 1. Instalação de Dependências

Para implementar a autenticação, duas novas dependências foram adicionadas ao `package.json`:

-   **`bcrypt`**: Uma biblioteca para fazer o *hashing* de senhas. É crucial nunca armazenar senhas em texto plano no banco de dados. Bcrypt é uma escolha popular e segura para criar um hash irreversível da senha do usuário.
-   **`jsonwebtoken`**: Uma biblioteca para criar e verificar JSON Web Tokens (JWT). Os tokens são usados para representar a identidade do usuário de forma segura entre o cliente e o servidor.

## 2. Alterações no Modelo de Usuário (`user.js`)

O modelo `User` foi modificado para suportar senhas e autenticação:

-   **Novo Campo `password`**: Um campo `password` foi adicionado ao modelo para armazenar o hash da senha do usuário.
-   **Hashing Automático de Senha**: Utilizando um *hook* `beforeCreate` do Sequelize, a senha fornecida pelo usuário é automaticamente transformada em um hash com `bcrypt` antes de ser salva no banco de dados.
-   **Validação de Senha**: Um novo método, `validatePassword`, foi adicionado ao protótipo do `User`. Este método compara uma senha fornecida durante o login com o hash armazenado no banco de dados, retornando `true` se a senha for válida.

## 3. Fluxo de Cadastro (Sign-up)

O `userController.js` foi atualizado para que a função `createUser` agora inclua o campo `password` ao criar um novo usuário. O processo de hashing é transparente para o controller, pois é gerenciado pelo modelo.

## 4. Fluxo de Login e Geração de Token

Esta é a parte central da autenticação:

-   **Novo Controller `authController.js`**: O antigo `sessionController.js` foi renomeado para `authController.js` para maior clareza.
-   **Rota de Login (`POST /auth/signIn`)**: Uma nova rota foi criada para lidar com as solicitações de login.
-   **Lógica de `signIn`**:
    1.  O usuário envia seu `login` (pode ser username ou e-mail) e `password`.
    2.  O sistema busca o usuário no banco de dados usando o método `findByLogin`.
    3.  Se o usuário existe, o método `validatePassword` é chamado para verificar se a senha está correta.
    4.  Se a senha for válida, um JWT é gerado usando `jsonwebtoken.sign`. Este token contém informações do usuário (como ID, e-mail e username) e é assinado com um segredo (`JWT_SECRET`).
    5.  O token é enviado de volta para o cliente.

## 5. Middleware de Verificação de JWT

Para proteger as rotas, um novo middleware foi adicionado ao `index.js` (o arquivo principal da aplicação):

-   Este middleware é executado em todas as requisições.
-   Ele procura por um cabeçalho `Authorization` no formato `Bearer <token>`.
-   Se o token existir, o middleware usa `jwt.verify` para decodificá-lo e verificar sua autenticidade usando o `JWT_SECRET`.
-   Se o token for válido, os dados do usuário são extraídos do token, o usuário é buscado no banco de dados e anexado ao objeto `req.context.me`.
-   Agora, qualquer rota subsequente pode verificar se `req.context.me` existe para saber se o usuário está autenticado.

## 6. Variável de Ambiente para o Segredo do JWT

-   A variável de ambiente `MY_SECRET` foi renomeada para `JWT_SECRET` para seguir as convenções e tornar seu propósito mais claro.
-   Um segredo seguro e aleatório foi gerado e adicionado ao arquivo `.env.sample`. **É fundamental que este segredo seja mantido privado em um ambiente de produção.**

## 7. Logout

Com JWTs, o logout é tipicamente gerenciado pelo cliente. Como os tokens são stateless (o servidor não armazena o estado do token), o logout consiste em simplesmente **remover o token do armazenamento no cliente** (seja `localStorage`, `sessionStorage` ou cookies). Uma vez que o token é excluído, o cliente não pode mais fazer requisições autenticadas.

## Links de Referência

Para entender melhor os conceitos aplicados, consulte os seguintes recursos:

-   **Introdução a JWT (JSON Web Tokens)**: [https://jwt.io/introduction/](https://jwt.io/introduction/)
-   **Documentação do `bcrypt`**: [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)
-   **Usando Middlewares no Express**: [https://expressjs.com/pt-br/guide/using-middleware.html](https://expressjs.com/pt-br/guide/using-middleware.html)
-   **Autenticação com JWT no Node.js (Artigo em Inglês)**: [https://www.digitalocean.com/community/tutorials/nodejs-jwt-json-web-token-auth-mongodb](https://www.digitalocean.com/community/tutorials/nodejs-jwt-json-web-token-auth-mongodb)
