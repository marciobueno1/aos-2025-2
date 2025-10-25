
const getAllFormacoesByPessoa = async (req, res) => {
  try {
    const pessoaId = req.params.pessoaId;
    const pessoa = await req.context.models.Pessoa.findByPk(pessoaId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada.' });
    }

    const formacoes = await req.context.models.Formacao.findAll({
      where: { pessoaId: pessoaId },
      order: [['dataInicio', 'DESC']],
    });
    return res.send(formacoes);
  } catch (error) {
    console.error('Erro em getAllFormacoesByPessoa:', error);
    return res.status(500).send({ message: 'Erro interno do servidor ao listar formações.' });
  }
};


const getFormacaoById = async (req, res) => {
  try {
    const formacao = await req.context.models.Formacao.findByPk(req.params.id);
    if (!formacao) {
      return res.status(404).send({ message: 'Formação não encontrada.' });
    }
    return res.send(formacao);
  } catch (error) {
    console.error('Erro em getFormacaoById:', error);
    return res.status(500).send({ message: 'Erro interno do servidor ao obter formação.' });
  }
};

const createFormacao = async (req, res) => {
  try {
    const pessoaId = req.params.pessoaId;
    const loggedInPessoaId = req.user.id;

    if (parseInt(pessoaId, 10) !== loggedInPessoaId) {
        return res.status(403).send({ message: 'Acesso proibido. Você só pode adicionar formações ao seu próprio perfil.' });
    }

    const pessoa = await req.context.models.Pessoa.findByPk(pessoaId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada para associar a formação.' });
    }

    const formacao = await req.context.models.Formacao.create({
      curso: req.body.curso,
      instituicao: req.body.instituicao,
      dataInicio: req.body.dataInicio,
      dataFim: req.body.dataFim,
      descricao: req.body.descricao,
      pessoaId: pessoaId,
    });
    return res.status(201).send(formacao);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: error.errors.map(e => e.message).join(', ') });
    }
    console.error('Erro em createFormacao:', error);
    return res.status(500).send({ message: 'Erro ao criar formação.' });
  }
};

const updateFormacao = async (req, res) => {
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
    await formacao.reload();
    return res.send(formacao);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: error.errors.map(e => e.message).join(', ') });
    }
    console.error('Erro em updateFormacao:', error);
    return res.status(500).send({ message: 'Erro ao atualizar formação.' });
  }
};


const deleteFormacao = async (req, res) => {
  try {
   
    const result = await req.context.models.Formacao.destroy({
      where: { id: req.params.id },
    });
    if (result === 0) {
      return res.status(404).send({ message: 'Formação não encontrada ou acesso negado.' });
    }
    return res.status(204).send(); 
  } catch (error) {
    console.error('Erro em deleteFormacao:', error);
    return res.status(500).send({ message: 'Erro ao deletar formação.' });
  }
};

export default {
    getAllFormacoesByPessoa,
    getFormacaoById,
    createFormacao,
    updateFormacao,
    deleteFormacao,
};
