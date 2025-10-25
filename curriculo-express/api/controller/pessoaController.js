const getAllPessoas = async (req, res) => { 
  try {
    const pessoas = await req.context.models.Pessoa.findAll();
    // Adiciona .toJSON() para garantir a serialização correta, embora geralmente não seja necessário para listas!!!!
    return res.send(pessoas.map(p => p.toJSON())); 
  } catch (error) {
    console.error('Erro em getAllPessoas:', error);
    return res.status(500).send({ message: 'Erro interno do servidor ao listar pessoas.' });
  }
};

const getPessoaById = async (req, res) => {
  try {
    const pessoa = await req.context.models.Pessoa.findByPk(req.params.id, {
      include: [
        { model: req.context.models.Experiencia, as: 'experiencias' },
        { model: req.context.models.Formacao, as: 'formacoes' },
        { model: req.context.models.Habilidade, as: 'habilidades' },
      ],

      // Tive que remover order pq estava dando erro 500 no Sequelize ao buscar pessoa por id
    //   order: [
    //     ['experiencias', 'dataInicio', 'DESC'],
    //     ['formacoes', 'dataInicio', 'DESC'],
    //     ['habilidades', 'nome', 'ASC'],
    //   ],


    });
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada.' });
    }
    return res.send(pessoa);
  } catch (error) {
    console.error('Erro em getPessoaById:', error);
    return res.status(500).send({ message: 'Erro interno do servidor ao obter pessoa.' });
  }
};

const createPessoa = async (req, res) => {
  try {
    const pessoa = await req.context.models.Pessoa.create({ 
      nome: req.body.nome, 
      email: req.body.email,
      idade: req.body.idade, 
      resumo: req.body.resumo,
      linkedinUrl: req.body.linkedinUrl,
      githubUrl: req.body.githubUrl,
    });
    return res.status(201).send(pessoa.toJSON()); 
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      // Corrigido: res.stauts -> res.status
      return res.status(400).send({ message: error.errors.map(e => e.message).join(', ') }); 
    }
    console.error('Erro em createPessoa:', error);
    return res.status(500).send({ message: 'Erro ao criar pessoa.' });
  }
};


const updatePessoa = async (req, res) => {
  try {
    const pessoa = await req.context.models.Pessoa.findByPk(req.params.id);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada.' });
    }
    await pessoa.update({
      nome: req.body.nome, 
      email: req.body.email,
      idade: req.body.idade, 
      resumo: req.body.resumo,
      linkedinUrl: req.body.linkedinUrl,
      githubUrl: req.body.githubUrl,
    });
    await pessoa.reload(); 
    return res.send(pessoa.toJSON()); 
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send({ message: error.errors.map(e => e.message).join(', ') });
    }
    console.error('Erro em updatePessoa:', error);
    return res.status(500).send({ message: 'Erro ao atualizar pessoa.' });
  }
};

const deletePessoa = async (req, res) => {
  try {
    const result = await req.context.models.Pessoa.destroy({
      where: { id: req.params.id }
    });
    if (result === 0) {
      return res.status(404).send({ message: 'Pessoa não encontrada.' });
    }
    return res.status(204).send(); 
  } catch (error) {
    console.error('Erro em deletePessoa:', error);
    return res.status(500).send({ message: 'Erro interno do servidor ao deletar pessoa.' });
  }
};

export default {
  getAllPessoas, 
  getPessoaById,
  createPessoa,
  updatePessoa,
  deletePessoa,
};

