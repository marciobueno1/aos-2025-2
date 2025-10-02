import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Listar todas as mensagens
router.get('/', async (req, res) => {
  try {
    const messages = await req.context.models.Message.findAll();
    return res.send(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

// Obter uma mensagem pelo ID
router.get('/:messageId', async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId,
    );
    if (!message) {
      return res.status(404).send({ message: 'Mensagem não encontrada.' });
    }
    return res.send(message);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

// Criar uma nova mensagem
router.post('/', async (req, res) => {
  try {
    // Verifica se o usuário autor da mensagem existe
    const user = await req.context.models.User.findByPk(req.body.userId);
    if (!user) {
      return res.status(404).send({ message: 'Usuário autor não encontrado.' });
    }
    
    const message = await req.context.models.Message.create({
      text: req.body.text,
      userId: req.body.userId,
    });
    return res.status(201).send(message);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao criar mensagem.' });
  }
});

// Atualizar uma mensagem
router.put('/:messageId', async (req, res) => {
    try {
        const message = await req.context.models.Message.findByPk(req.params.messageId);
        if (!message) {
            return res.status(404).send({ message: 'Mensagem não encontrada.' });
        }
        await message.update({ text: req.body.text });
        return res.send(message);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Erro ao atualizar mensagem.' });
    }
});

// Deletar uma mensagem
router.delete('/:messageId', async (req, res) => {
  try {
    const result = await req.context.models.Message.destroy({
      where: { id: req.params.messageId },
    });
    if (result === 0) {
      return res.status(404).send({ message: 'Mensagem não encontrada.' });
    }
    return res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao deletar mensagem.' });
  }
});

export default router;
