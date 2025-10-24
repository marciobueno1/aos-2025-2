const getAllpessoas = async (req, res) => {
    try {
        const pessoas = await req.context.models.Pessoa.findAll();
        return res.send(pessoas);
    } catch (error){
        console.error('Erro em getAllpessoas:', error);
        return res.status(500).send({ message: 'Erro interno do servidor.'});
    }
};

const getPessoaById = async (req, res) => { 
    try {
        const pessoa = await req.context.models.Pessoa.findByPk(req.params.id, {
            include : [
                {model: req.context.models.Experiencia, as: 'experiencias'},
                {model: req.context.models.Formacao, as: 'formacoes'},
                {model: req.context.models.Habilidade, as: 'habilidades'},

            ],
            order: [
                ['experiencias', 'dataInicio', 'DESC'],
                ['formacoes', 'dataInicio', 'DESC'],
                ['habilidades', 'nome', 'ASC'],
            ],
        });
        if (!pessoa) {
            return res.status(404).send({ message: 'Pessoa não encontrada.'});
        }
        return res.send(pessoa);
    } catch(error) {
        console.error('Erro em getPessoaById:', error);
        return res.status(500).send({ message: 'Erro interno do servdor ao obter pessoa.'})
    }
};

const createPessoa = async (req, res) => {
    try {
        const pessoa = await req.context.models.Pessooa.create({
            name: req.bodyy.name,
            email: req.body.email,
            resumo: req.body.resumo,
            linkedinUrl: req.body.linkedinUrl,
            githubUrl: req.body.githubUrl,
        });
        return res.status(201).send(pessoa);
    } catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            return res.stauts(400).send({message: error.errors.map(e => e.message).join(', ')});
    }
        console.error('Erro em createPessoa:', error);
        return res.status(500).send({ message: 'Erro interno do servidor ao criar pessoa.'});
    }
};

const updatePessoa = async (req, res) => {
    try {
        const pessoa = await req.context.models.Pessoa.findByPk(req.params.id);
        if (!pessoa) {
            return res.status(404).send({ message: 'Pessoa não encontrada.'});
        }
        await pessoa.update({
            name: req.body.name,
            email: req.body.email,
            resumo: req.body.resumo,
            linkedinUrl: req.body.linkedinUrl,
            githubUrl: req.body.githubUrl,
        });
        return res.send(pessoa);
    } catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {

            
            return res.status(400).send({message: error.errors.map(e => e.message).join(', ')});
    }
        console.error('Erro em updatePessoa:', error);
        return res.status(500).send({ message: 'Erro interno do servidor ao atualizar pessoa.'});
    }
};

const deletePessoa = async (req, res) => {
    try {
        const result = await req.context.models.Pessoa.destroy({ 
            where: { id: req.params.id }
        });
        if (result === 0) {
            return res.status(404).send({ message: 'Pessoa não encontrada.'});
        }
        return res.sendStatus(204); // No Content
    } catch (error) {
        console.error('Erro em deletePessoa:', error);
        return res.status(500).send({ message: 'Erro interno do servidor ao deletar pessoa.'});
    }
};

export default {
    getAllpessoas,
    getPessoaById,
    createPessoa,
    updatePessoa,
    deletePessoa,
};