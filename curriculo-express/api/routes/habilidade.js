import { Router } from 'express';

const router = Router();

router.get('/pessoas/:pessoaId/habilidades', async (req, res) => {
  try {
    const habilidades = await req.context.models.Habilidade.findAll({
      where: { pessoaId: req.params.pessoaId },
      order: [['nome', 'ASC']], // Ordena por nome
    });
    return res.send(habilidades);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const habilidade = await req.context.models.Habilidade.findByPk(req.params.id);
    if (!habilidade) {
      return res.status(404).send({ message: 'Habilidade não encontrada.' });
    }
    return res.send(habilidade);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

router.post('/pessoas/:pessoaId/habilidades', async (req, res) => {
  try {
    const pessoa = await req.context.models.Pessoa.findByPk(req.params.pessoaId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada para associar a habilidade.' });
    }

    const habilidade = await req.context.models.Habilidade.create({
      nome: req.body.nome,
      nivel: req.body.nivel, // Pode ser null
      pessoaId: req.params.pessoaId,
    });
    return res.status(201).send(habilidade);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: error.message });
    }
    console.error(error);
    return res.status(500).send({ message: 'Erro ao criar habilidade.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const habilidade = await req.context.models.Habilidade.findByPk(req.params.id);
    if (!habilidade) {
      return res.status(404).send({ message: 'Habilidade não encontrada.' });
    }

    await habilidade.update({
      nome: req.body.nome,
      nivel: req.body.nivel,
    });

    return res.send(habilidade);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: error.message });
    }
    console.error(error);
    return res.status(500).send({ message: 'Erro ao atualizar habilidade.' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const result = await req.context.models.Habilidade.destroy({
      where: { id: req.params.id },
    });
    if (result === 0) {
      return res.status(404).send({ message: 'Habilidade não encontrada.' });
    }
    return res.status(204).send(); 
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao deletar habilidade.' });
  }
});

export default router;