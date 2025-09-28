import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// CORREÇÃO: Apontamos para os arquivos index.js específicos dentro das pastas
import models, { sequelize } from './models/index.js';
import routes from './routes/index.js';

const app = express();

// Middlewares essenciais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware customizado para adicionar os modelos ao contexto de cada requisição
app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// Registra as rotas da nossa API
app.use('/users', routes.userRoutes);
app.use('/messages', routes.messageRoutes);

// Rota de boas-vindas para a raiz
app.get('/', (req, res) => {
  res.send('<h1>API com Sequelize e PostgreSQL</h1><p>Acesse /users ou /messages para testar.</p>');
});

// Sincroniza o banco de dados e inicia o servidor
const eraseDatabaseOnSync = false; // CUIDADO: true apaga o banco a cada reinicialização

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  console.log('Banco de dados sincronizado!');
  
  app.listen(process.env.PORT, () => {
    console.log(`API escutando na porta ${process.env.PORT}!`);
  });
});

export default app;

