import express from 'express';
import cors from 'cors';

import sequelize from './db/sequelize.js';
import User from './models/User.js';
import Message from './models/Message.js';
import Tarefa from './models/Tarefa.js';           // novo model
import usersRouter from './routes/users.js';
import messagesRouter from './routes/messages.js';
import tarefasRouter from './routes/tarefas.js';   // novas rotas

// Evita registrar associações mais de uma vez (cold starts, múltiplos imports)
function applyAssociationsOnce() {
  const ua = User.associations || {};
  const ma = Message.associations || {};

  if (!ua.messages) {
    User.hasMany(Message, {
      as: 'messages',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
  if (!ma.user) {
    Message.belongsTo(User, { as: 'user', foreignKey: 'userId' });
  }
  // Tarefa não possui associação neste exercício
}

export async function initDb() {
  applyAssociationsOnce();
  await sequelize.authenticate();
  await sequelize.sync(); // cria/atualiza users, messages, tarefas
  console.log('[db] conectado e sincronizado');
}

const app = express();
app.use(cors());
app.use(express.json());

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Rotas existentes
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

// Novas rotas
app.use('/api/tarefas', tarefasRouter);

export default app;
