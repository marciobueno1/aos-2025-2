import { Router } from 'express';

const router = Router();

// Listar todas as Pessoas (pode ser útil ter mais de um currículo)
router.get('/', async (req, res) => {
  try {
    const pessoas = await req.context.models.Pessoa.findAll();
    return res.send(pessoas);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

// Obter uma Pessoa específica pelo ID, incluindo seus dados associados
router.get('/:id', async (req, res) => {
  try {
    const pessoa = await req.context.models.Pessoa.findByPk(req.params.id, {
      // Importante: Inclui os dados das tabelas relacionadas
      include: [
        { model: req.context.models.Experiencia, as: 'experiencias' },
        { model: req.context.models.Formacao, as: 'formacoes' },
        { model: req.context.models.Habilidade, as: 'habilidades' },
      ],
      // Ordena os itens associados (opcional, mas bom para UI)
      order: [
        ['experiencias', 'dataInicio', 'DESC'],
        ['formacoes', 'dataInicio', 'DESC'],
        ['habilidades', 'nome', 'ASC'],
      ],
    });
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada.' });
    }
    return res.send(pessoa);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
});

// Criar uma nova Pessoa
router.post('/', async (req, res) => {
  try {
    const pessoa = await req.context.models.Pessoa.create({
      nome: req.body.nome,
      email: req.body.email,
      resumo: req.body.resumo,
      linkedinUrl: req.body.linkedinUrl,
      githubUrl: req.body.githubUrl,
      // Adicione outros campos conforme necessário
    });
    return res.status(201).send(pessoa);
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send({ message: error.message });
    }
    console.error(error);
    return res.status(500).send({ message: 'Erro ao criar pessoa.' });
  }
});

// Atualizar uma Pessoa
router.put('/:id', async (req, res) => {
  try {
    const pessoa = await req.context.models.Pessoa.findByPk(req.params.id);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada.' });
    }

    await pessoa.update({
      nome: req.body.nome,
      email: req.body.email,
      resumo: req.body.resumo,
      linkedinUrl: req.body.linkedinUrl,
      githubUrl: req.body.githubUrl,
      // Adicione outros campos conforme necessário
    });

    return res.send(pessoa);
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send({ message: error.message });
    }
    console.error(error);
    return res.status(500).send({ message: 'Erro ao atualizar pessoa.' });
  }
});

// Deletar uma Pessoa (e todos os dados associados devido ao onDelete: 'CASCADE')
router.delete('/:id', async (req, res) => {
  try {
    const result = await req.context.models.Pessoa.destroy({
      where: { id: req.params.id },
    });
    if (result === 0) {
      return res.status(404).send({ message: 'Pessoa não encontrada.' });
    }
    return res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao deletar pessoa.' });
  }
});

export default router;