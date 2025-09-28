import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import sequelize from './db/sequelize.js';
import usersRouter from './routes/users.js';
import messagesRouter from './routes/messages.js';

// registra models e associações
import './models/User.js';
import './models/Message.js';

const app = express();

// mesmas configs que você tinha
app.set('trust proxy', true);
const corsOptions = {
  origin: ['http://example.com', '*'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// rotas CRUD com Sequelize
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// 500
app.use((err, req, res, next) => {
  console.error('[Internal Error]', err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : err.message,
  });
});

export async function initDb() {
  await sequelize.authenticate();
  await sequelize.sync();
}

export default app;
