import express from 'express';
import cors from 'cors';

import sequelize from './db/sequelize.js';
import User from './models/User.js';
import Message from './models/Message.js';
import usersRouter from './routes/users.js';
import messagesRouter from './routes/messages.js';

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
}

export async function initDb() {
  applyAssociationsOnce();
  await sequelize.authenticate();
  await sequelize.sync(); // use { alter: true } se quiser ajustar schema sem perda
  console.log('[db] conectado e sincronizado');
}

const app = express();
app.use(cors());
app.use(express.json());

// Health (não toca DB no handler; aqui tudo bem tocar se já chamar /api/health via app)
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Rotas
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

export default app;
