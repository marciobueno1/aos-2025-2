import express from 'express';
import cors from 'cors';

import sequelize from './db/sequelize.js';
import User from './models/User.js';
import Message from './models/Message.js';
import usersRouter from './routes/users.js';
import messagesRouter from './routes/messages.js';

// Associações
User.hasMany(Message, { as: 'messages', foreignKey: 'userId' });
Message.belongsTo(User, { as: 'user', foreignKey: 'userId' });

export async function initDb() {
  await sequelize.authenticate();
  // Ajuste conforme seu caso: { alter: true } atualiza schema sem perder dados
  await sequelize.sync();
  console.log('[db] conectado e sincronizado');
}

const app = express();
app.use(cors());
app.use(express.json());

// Health (para debug no Vercel)
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Rotas principais
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

export default app;
