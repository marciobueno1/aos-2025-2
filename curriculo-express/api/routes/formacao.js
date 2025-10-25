import { Router } from 'express';

const router = Router();

router.get('/pessoas/:pessoaId/formacoes', async (req, res) => {
  try {
    const formacoes = await req.context.models.Formacao.findAll({
      where: { pessoaId: req.params.pessoaId },
      order: [['dataInicio', 'DESC']],
    });
    return res.send(formacoes);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

// Obter uma formação específica pelo ID
router.get('/:id', async (req, res) => {
  try {
    const formacao = await req.context.models.Formacao.findByPk(req.params.id);
    if (!formacao) {
      return res.status(404).send({ message: 'Formação não encontrada.' });
    }
    return res.send(formacao);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

router.post('/pessoas/:pessoaId/formacoes', async (req, res) => {
  try {
    const pessoa = await req.context.models.Pessoa.findByPk(req.params.pessoaId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada para associar a formação.' });
    }

    const formacao = await req.context.models.Formacao.create({
      curso: req.body.curso,
      instituicao: req.body.instituicao,
      dataInicio: req.body.dataInicio,
      dataFim: req.body.dataFim, // Pode ser null
      descricao: req.body.descricao,
      pessoaId: req.params.pessoaId,
    });
    return res.status(201).send(formacao);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: error.message });
    }
    console.error(error);
    return res.status(500).send({ message: 'Erro ao criar formação.' });
  }
});





router.put('/:id', async (req, res) => {
  try {
    const formacao = await req.context.models.Formacao.findByPk(req.params.id);
    if (!formacao) {
      return res.status(404).send({ message: 'Formação não encontrada.' });
    }

    await formacao.update({
      curso: req.body.curso,
      instituicao: req.body.instituicao,
      dataInicio: req.body.dataInicio,
      dataFim: req.body.dataFim,
      descricao: req.body.descricao,
    });

    return res.send(formacao);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: error.message });
    }
    console.error(error);
    return res.status(500).send({ message: 'Erro ao atualizar formação.' });
  }
});

// Deletar uma formação
router.delete('/:id', async (req, res) => {
  try {
    const result = await req.context.models.Formacao.destroy({
      where: { id: req.params.id },
    });
    if (result === 0) {
      return res.status(404).send({ message: 'Formação não encontrada.' });
    }
    return res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao deletar formação.' });
  }
});

export default router;