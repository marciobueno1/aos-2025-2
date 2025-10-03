# ex01-express — Express + PostgreSQL (Sequelize) + Vercel

Backend com rotas `users`, `messages` e `tarefas` usando **Sequelize** e **PostgreSQL** (NeonDB), publicado na **Vercel**.

## Links de entrega
- **Código (branch da entrega)**: https://github.com/carlinhosborba/aos-2025-2-fork/tree/feature/sequelize-crud/ex01-express
- **Back-end (PRODUCTION)**: https://aos-2025-2-fork.vercel.app  
  - Health: https://aos-2025-2-fork.vercel.app/api/health

## Rotas & Status Codes
- `201` criado, `204` sem conteúdo (delete), `404` não encontrado, `500` erro interno.

### Users (`/api/users`)
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users` body: `{ "name": "Fulano", "email": "fulano@ex.com" }` → **201**
- `PUT /api/users/:id` body: `{ "name": "Novo Nome" }`
- `DELETE /api/users/:id` → **204**

### Messages (`/api/messages`)
- `GET /api/messages`
- `GET /api/messages/:id`
- `POST /api/messages` body: `{ "text": "Olá", "userId": 1 }` → **201**
- `PUT /api/messages/:id` body: `{ "text": "Atualizada" }`
- `DELETE /api/messages/:id` → **204**

### Tarefas (`/api/tarefas`)
- `GET /api/tarefas`
- `GET /api/tarefas/:objectId`
- `POST /api/tarefas` body: `{ "descricao": "Estudar Sequelize" }` → **201**
- `PUT /api/tarefas/:objectId` body: `{ "concluida": true }`
- `DELETE /api/tarefas/:objectId` → **204**

## Postman
Importe a coleção `aos-2025-ex01.postman_collection.json` e defina a variável:
```
base_url = https://aos-2025-2-fork.vercel.app
```

## Variáveis de ambiente (.env)
Use `DATABASE_URL` do Neon (também configurado na Vercel – Production e Preview):
```
DATABASE_URL="postgres://<usuario>:<senha>@<host>/<db>?sslmode=require"
```
> Alternativamente, podem ser usados `PG_HOST`, `PG_DATABASE`, `PG_USER`, `PG_PASSWORD`, `PG_PORT`, `PG_SSL=true`.

## Rodar localmente
```bash
npm install
npm run dev
# Teste:
curl http://localhost:3000/api/health
```

## Publicação (Vercel)
- `api/index.js` é o handler serverless que usa `src/app.js`.
- `vercel.json` roteia `/api/*` para as functions.
- Production promovido em: **https://aos-2025-2-fork.vercel.app**
