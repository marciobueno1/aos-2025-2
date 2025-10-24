import { Router } from 'express';

const router = Router();

// Exemplo: GET /pessoas/1/experiencias -> Lista experiências da PessFoa 1
// Exemplo: POST /pessoas/1/experiencias -> Cria experiência para a Pessoa 1

// Listar todas as experiências de uma Pessoa específica
router.get('/pessoas/:pessoaId/experiencias', async (req, res) => {
    try {
        const experiencias = await req.context.models.Experiencia.findAll({
            where: { pessoaId: req.params.pessoaId },
            order: [['dataInicio', 'DESC']], // Ordena da mais recente para a mais antiga
        });
        return res.send(experiencias);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
});

// Obter uma experiência específica pelo ID
router.get('/:id', async (req, res) => {
    try {
        const experiencia = await req.context.models.Experiencia.findByPk(req.params.id);
        if (!experiencia) {
            return res.status(404).send({ message: 'Experiência não encontrada.' });
        }
        return res.send(experiencia);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
});


// Criar uma nova experiência para uma Pessoa específica
router.post('/pessoas/:pessoaId/experiencias', async (req, res) => {
    try {
        // Verifica se a Pessoa existe
        const pessoa = await req.context.models.Pessoa.findByPk(req.params.pessoaId);
        if (!pessoa) {
            return res.status(404).send({ message: 'Pessoa não encontrada para associar a experiência.' });
        }

        const experiencia = await req.context.models.Experiencia.create({
            cargo: req.body.cargo,
            empresa: req.body.empresa,
            dataInicio: req.body.dataInicio,
            dataFim: req.body.dataFim, // Pode ser null
            descricao: req.body.descricao,
            pessoaId: req.params.pessoaId, // Associa à pessoa da URL
        });
        return res.status(201).send(experiencia);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).send({ message: error.message });
        }
        console.error(error);
        return res.status(500).send({ message: 'Erro ao criar experiência.' });
    }
});

// Atualizar uma experiência existente
router.put('/:id', async (req, res) => {
    try {
        const experiencia = await req.context.models.Experiencia.findByPk(req.params.id);
        if (!experiencia) {
            return res.status(404).send({ message: 'Experiência não encontrada.' });
        }

        await experiencia.update({
            cargo: req.body.cargo,
            empresa: req.body.empresa,
            dataInicio: req.body.dataInicio,
            dataFim: req.body.dataFim,
            descricao: req.body.descricao,
            // Não permitimos alterar o pessoaId aqui
        });

        return res.send(experiencia);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).send({ message: error.message });
        }
        console.error(error);
        return res.status(500).send({ message: 'Erro ao atualizar experiência.' });
    }
});

// Deletar uma experiência
router.delete('/:id', async (req, res) => {
    try {
        const result = await req.context.models.Experiencia.destroy({
            where: { id: req.params.id },
        });
        if (result === 0) {
            return res.status(404).send({ message: 'Experiência não encontrada.' });
        }
        return res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Erro ao deletar experiência.' });
    }
});

export default router;