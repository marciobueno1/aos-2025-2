import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { sequelize } from './models/index.js'; 
import errorMiddleware from './middleware/errorMiddleware.js';
import routes from './routes/index.js'; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.use('/pessoas', routes.pessoaRoutes); 
app.use('/experiencias', routes.experienciaRoutes); 
app.use('/formacoes', routes.formacaoRoutes);     
app.use('/habilidades', routes.habilidadeRoutes);   

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('<h1>API de Currículo com Sequelize e PostgreSQL</h1>');
});

const eraseDatabaseOnSync = true; // Mantenha true para desenvolvimento

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  console.log('Banco de dados sincronizado!');

  if (eraseDatabaseOnSync) {
      await criarDadosIniciais(); // Chama a função para criar os 2 currículos
  }

  app.listen(process.env.PORT, () => {
    console.log(`API escutando na porta ${process.env.PORT}!`);
  });
}).catch(err => { 
    console.error('Erro ao sincronizar o banco de dados:', err);
});


const criarDadosIniciais = async () => {
  try {
    console.log('Criando dados iniciais...');
    // Pessoa 1
    const pessoa1 = await models.Pessoa.create({
      nome: 'Kaiki Barros', email: 'kaiki.teste@email.com', idade: 21, resumo: 'Estudante de Sistemas para Internet.',
      linkedinUrl: 'https://linkedin.com/in/kaiki', githubUrl: 'https://github.com/kaikibarros'
    });
    await models.Experiencia.create({ cargo: 'Jovem Aprendiz', empresa: 'TV Tribuna PE', dataInicio: '2023-01-15', dataFim: '2024-01-15', descricao: 'Suporte técnico e manutenção.', pessoaId: pessoa1.id });
    await models.Formacao.create({ 
        curso: 'Tecnólogo em Sistemas para Internet', instituicao: 'Universidade Católica de Pernambuco', 
        grau: 'Superior', dataInicio: '2024-02-01', pessoaId: pessoa1.id 
    });
    await models.Habilidade.create({ nome: 'Node.js', nivel: 'Intermediário', pessoaId: pessoa1.id });
    await models.Habilidade.create({ nome: 'React Native', nivel: 'Básico', pessoaId: pessoa1.id });

    
    // Pessoa 2
    const pessoa2 = await models.Pessoa.create({
      nome: 'Ana Souza', email: 'ana.teste@email.com', idade: 25, resumo: 'Desenvolvedora Frontend com experiência em React.',
      linkedinUrl: 'https://linkedin.com/in/anasouza', githubUrl: 'https://github.com/anasouza'
    });
    await models.Experiencia.create({ cargo: 'Desenvolvedora Frontend Jr', empresa: 'Tech Solutions', dataInicio: '2022-08-01', descricao: 'Criação de interfaces web responsivas.', pessoaId: pessoa2.id });
    await models.Formacao.create({ 
        curso: 'Ciência da Computação', instituicao: 'Universidade Federal', 
        grau: 'Bacharelado', dataFim: '2022-07-30', pessoaId: pessoa2.id 
    });
    await models.Habilidade.create({ nome: 'React', nivel: 'Avançado', pessoaId: pessoa2.id });
    await models.Habilidade.create({ nome: 'CSS', nivel: 'Avançado', pessoaId: pessoa2.id });

    console.log('Dados iniciais criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar dados iniciais:', error); 
  }
};

export default app;

