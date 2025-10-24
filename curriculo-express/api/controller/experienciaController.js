const getAllexperienciasByPessoa = async (req, res) => {
    try {
        const pessoaId = req.params.pessoaId;
        const pessoa = await req.context.models.Pessoa.findByPk(pessoaId);
        if (!pessoa) {
            return res.status(404).send({ message: 'Pessoa não encontrada.'});
        }
        const experiencias = await req.context.models.Experiencia.findAll({
            where: { pessoaId: pessoaId },
            order: [['dataInicio', 'DESC']],
        });
        return res.send(experiencias);
    } catch (error){
        console.error('Erro em getAllExperienciasByPessoa:', error);
        return res.status(500).send({ message: 'Erro interno do servidor.'});
    }
};
// até aqui ok
const getExperienciaById = async (req, res) => { 
    try {
        const experiencia = await req.context.models.Experiencia.findByPk(req.params.id);  
        if (!experiencia) {
            return res.status(404).send({ message: 'Experiencia não encontrada.'});
        } 
         return res.send(experiencia)

    }catch(error) {
        console.error('Erro em getPessoaById:', error);
        return res.status(500).send({ message: 'Erro interno do servdor ao obter Experiencia.'});
    }
};




const createExperiencia = async (req, res) => {
    try {
        const experiencia = await req.context.models.Pessooa.create({
           cargo: req.body.cargo,
           empresa: req.body.empresa,
           dataInicio: req.body.dataInicio,
           dataFim: req.body.dataFim,
           descricao: req.body.descricao,
           pessoaId: req.body.pessoaId,
        });
        return res.status(201).send(experiencia);
    } catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            return res.stauts(400).send({message: error.errors.map(e => e.message).join(', ')});
    }
        console.error('Erro em createPessoa:', error);
        return res.status(500).send({ message: 'Erro interno do servidor ao criar Experiencia.'});
    }
};

const updateExperiencia = async (req, res) => {
    try {
        const experiencia = await req.context.models.Experiencia.findByPk(req.params.id);
        if (!experiencia) {
            return res.status(404).send({ message: 'Experiencia não encontrada.'});
        }
        await experiencia.update({
            name: req.body.name,
            email: req.body.email,
            resumo: req.body.resumo,
            linkedinUrl: req.body.linkedinUrl,
            githubUrl: req.body.githubUrl,
        });
        return res.send(experiencia);
    } catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {

            
            return res.status(400).send({message: error.errors.map(e => e.message).join(', ')});
    }
        console.error('Erro em updatePessoa:', error);
        return res.status(500).send({ message: 'Erro interno do servidor ao atualizar Experiencia.'});
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