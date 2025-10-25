
const getAllHabilidadesByPessoa = async (req, res) => {
  try {
    const pessoaId = req.params.pessoaId;
    const pessoa = await req.context.models.Pessoa.findByPk(pessoaId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada.' });
    }

    
    const habilidades = await req.context.models.Habilidade.findAll({
      where: { pessoaId: pessoaId },
      order: [['nome', 'ASC']],
    });
    return res.send(habilidades);
  } catch (error) {
    console.error('Erro em getAllHabilidadesByPessoa:', error);
    return res.status(500).send({ message: 'Erro interno do servidor ao listar habilidades.' });
  }
};

const getHabilidadeById = async (req, res) => {
  try {
    const habilidade = await req.context.models.Habilidade.findByPk(req.params.id);
    if (!habilidade) {
      return res.status(404).send({ message: 'Habilidade não encontrada.' });
    }
    return res.send(habilidade);
  } catch (error) {
    console.error('Erro em getHabilidadeById:', error);
    return res.status(500).send({ message: 'Erro interno do servidor ao obter habilidade.' });
  }
};
const createHabilidade = async (req, res) => {
  try {
    const pessoaId = req.params.pessoaId;
    const loggedInPessoaId = req.user.id;

    if (parseInt(pessoaId, 10) !== loggedInPessoaId) {
        return res.status(403).send({ message: 'Acesso proibido. Você só pode adicionar habilidades ao seu próprio perfil.' });
    }

    const pessoa = await req.context.models.Pessoa.findByPk(pessoaId);
    if (!pessoa) {
      return res.status(404).send({ message: 'Pessoa não encontrada para associar a habilidade.' });
    }

    const habilidade = await req.context.models.Habilidade.create({
      nome: req.body.nome,
      nivel: req.body.nivel, // Pode ser null
      pessoaId: pessoaId,
    });
    return res.status(201).send(habilidade);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: error.errors.map(e => e.message).join(', ') });
    }
    console.error('Erro em createHabilidade:', error);
    return res.status(500).send({ message: 'Erro ao criar habilidade.' });
  }
};

const updateHabilidade = async (req, res) => {
  try {
     const habilidade = await req.context.models.Habilidade.findByPk(req.params.id);
      if (!habilidade) {
        return res.status(404).send({ message: 'Habilidade não encontrada.' });
    }
   

    await habilidade.update({
      nome: req.body.nome,
      nivel: req.body.nivel,
    });
    await habilidade.reload();
    return res.send(habilidade);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: error.errors.map(e => e.message).join(', ') });
    }
    console.error('Erro em updateHabilidade:', error);
    return res.status(500).send({ message: 'Erro ao atualizar habilidade.' });
  }
};

const deleteHabilidade = async (req, res) => {
  try {

    const result = await req.context.models.Habilidade.destroy({
      where: { id: req.params.id },
    });
    if (result === 0) {
      return res.status(404).send({ message: 'Habilidade não encontrada ou acesso negado.' });
    }
    return res.status(204).send(); 
  } catch (error) {
    console.error('Erro em deleteHabilidade:', error);
    return res.status(500).send({ message: 'Erro ao deletar habilidade.' });
  }
};


export default {
    getAllHabilidadesByPessoa,
    getHabilidadeById,
    createHabilidade,
    updateHabilidade,
    deleteHabilidade,
};
