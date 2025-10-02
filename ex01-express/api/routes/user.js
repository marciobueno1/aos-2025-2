import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await req.context.models.User.findAll();
    return res.send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

// Obter um usuário pelo ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

// Criar um novo usuário
router.post('/', async (req, res) => {
  try {
    const user = await req.context.models.User.create({
      username: req.body.username,
    });
    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao criar usuário.' });
  }
});

// Atualizar um usuário
router.put('/:userId', async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    await user.update({ username: req.body.username });
    return res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao atualizar usuário.' });
  }
});

// Deletar um usuário
router.delete('/:userId', async (req, res) => {
  try {
    const result = await req.context.models.User.destroy({
      where: { id: req.params.userId },
    });
    if (result === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    return res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao deletar usuário.' });
  }
});

export default router;