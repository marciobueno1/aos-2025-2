import { Router } from 'express';

const router = Router();

// Listar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tarefas = await req.context.models.Tarefa.findAll();
    return res.send(tarefas);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

// Obter uma tarefa pelo ID
router.get('/:id', async (req, res) => {
  try {
    const tarefa = await req.context.models.Tarefa.findByPk(req.params.id);
    if (!tarefa) {
      return res.status(404).send({ message: 'Tarefa não encontrada.' });
    }
    return res.send(tarefa);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

// Criar uma nova tarefa
router.post('/', async (req, res) => {
  try {
    // Como não há middleware de autenticação, o userId precisa de ser enviado no corpo da requisição
    const { descricao, concluida, userId } = req.body;

    // Verifica se o utilizador autor da tarefa existe
    const user = await req.context.models.User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: 'Utilizador autor não encontrado.' });
    }

    const tarefa = await req.context.models.Tarefa.create({
      descricao: descricao,
      concluida: concluida,
      userId: userId, // Associamos a tarefa ao utilizador enviado no corpo
    });
    return res.status(201).send(tarefa);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: error.message });
    }
    console.error(error);
    return res.status(500).send({ message: 'Erro ao criar tarefa.' });
  }
});

// Atualizar uma tarefa
router.put('/:id', async (req, res) => {
  try {
    const tarefa = await req.context.models.Tarefa.findByPk(req.params.id);
    if (!tarefa) {
      return res.status(404).send({ message: 'Tarefa não encontrada.' });
    }
    
    await tarefa.update({ 
        descricao: req.body.descricao,
        concluida: req.body.concluida 
    });

    return res.send(tarefa);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).send({ message: error.message });
    }
    console.error(error);
    return res.status(500).send({ message: 'Erro ao atualizar tarefa.' });
  }
});

// Apagar uma tarefa
router.delete('/:id', async (req, res) => {
  try {
    const result = await req.context.models.Tarefa.destroy({
      where: { id: req.params.id },
    });
    if (result === 0) {
      return res.status(404).send({ message: 'Tarefa não encontrada.' });
    }
    return res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao apagar tarefa.' });
  }
});

export default router;