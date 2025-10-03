import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
 
    const tarefas = await req.context.models.Tarefa.findAll({
      order: [['id', 'ASC']],
    });
    return res.send(tarefas);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

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

router.post('/', async (req, res) => {
  try {
    const { descricao, concluida, userId } = req.body;

   
    const user = await req.context.models.User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: 'Utilizador autor não encontrado.' });
    }

    const tarefa = await req.context.models.Tarefa.create({
      descricao: descricao,
      concluida: concluida,
      userId: userId, 
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


router.delete('/:id', async (req, res) => {
  try {
    const result = await req.context.models.Tarefa.destroy({
      where: { id: req.params.id },
    });
    if (result === 0) {
      return res.status(404).send({ message: 'Tarefa não encontrada.' });
    }
    return res.status(204).send(); 
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao apagar tarefa.' });
  }
});

export default router;

