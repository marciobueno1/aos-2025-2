// Simula a verificação se um utilizador está logado.
export const isAuthenticated = (req, res, next) => {
  console.log('Middleware: Verificando autenticação...');
  // Simula um utilizador/pessoa logada para teste.
  // Num sistema real, este 'user' viria da decodificação do token/sessão
  // e provavelmente conteria o ID da Pessoa associada.
  req.user = { id: 1 }; // !!! Exemplo: Assume que a Pessoa com ID 1 está logada !!!
  
  if (req.user && req.user.id) {
    console.log(`Utilizador autenticado (simulado com Pessoa ID: ${req.user.id}).`);
    next(); // Passa para a próxima função
  } else {
     // Se não estivesse autenticado, retornaria erro 401
     return res.status(401).send({ message: 'Acesso não autorizado. Autenticação necessária.' });
  }
};

// Verifica se o utilizador logado é o "dono" do recurso (Pessoa)
// ou se o recurso filho (Experiencia, Formacao, Habilidade) pertence à Pessoa logada.
export const isResourceOwner = (modelName) => {
  return async (req, res, next) => {
    console.log(`Middleware: Verificando propriedade do recurso ${modelName}...`);
    // O ID do recurso principal (Pessoa, Experiencia, etc.) vem de req.params.id
    // O ID da Pessoa logada vem de req.user.id (assumido pelo isAuthenticated)
    const resourceId = req.params.id; 
    const loggedInPessoaId = req.user.id; 

    if (!resourceId || !loggedInPessoaId) {
        return res.status(400).send({ message: 'IDs inválidos para verificação de propriedade.' });
    }

    try {
      const Model = req.context.models[modelName];
      if (!Model) {
        console.error(`Modelo ${modelName} não encontrado no contexto.`);
        return res.status(500).send({ message: 'Erro interno do servidor (modelo não encontrado).' });
      }

      const resource = await Model.findByPk(resourceId);

      if (!resource) {
        return res.status(404).send({ message: `${modelName} com ID ${resourceId} não encontrado.` });
      }

      let isOwner = false;
      // Verifica a propriedade com base no tipo de modelo
      if (modelName === 'Pessoa') {
        // Se estamos a modificar a própria Pessoa, o ID deve corresponder
        isOwner = resource.id === loggedInPessoaId;
      } else if (resource.pessoaId) {
        // Se for Experiencia, Formacao ou Habilidade, verifica a chave estrangeira
        isOwner = resource.pessoaId === loggedInPessoaId;
      } else {
         console.warn(`Modelo ${modelName} não tem campo 'pessoaId' esperado para verificação de propriedade.`);
         // Decide como lidar com modelos sem pessoaId (talvez permitir acesso de admin?)
         // Por agora, negamos o acesso para segurança.
         isOwner = false;
      }


      if (isOwner) {
        console.log(`Utilizador (Pessoa ID: ${loggedInPessoaId}) é o dono do recurso ${modelName} ID: ${resourceId}.`);
        next(); // Permite o acesso
      } else {
         console.log(`Utilizador (Pessoa ID: ${loggedInPessoaId}) NÃO é o dono do recurso ${modelName} ID: ${resourceId}.`);
         // Num sistema real, retornaria erro 403 Forbidden
         return res.status(403).send({ message: 'Acesso proibido. Você não tem permissão para modificar este recurso.' });
         // Para fins de teste, permitimos passar (REMOVER EM PRODUÇÃO):
         // next(); 
      }
    } catch (error) {
      console.error(`Erro no middleware isResourceOwner para ${modelName}:`, error);
      return res.status(500).send({ message: 'Erro interno do servidor durante a verificação de propriedade.' });
    }
  };
};

// Middleware específico para verificar se a Pessoa sendo modificada é a mesma logada
// (pode ser usado nas rotas PUT/DELETE /pessoas/:id)
export const isSelf = async (req, res, next) => {
    console.log('Middleware: Verificando se é o próprio utilizador...');
    const targetPessoaId = parseInt(req.params.id, 10); // ID da pessoa na URL
    const loggedInPessoaId = req.user.id; // ID da pessoa logada

    if (targetPessoaId === loggedInPessoaId) {
        console.log('Acesso permitido: É o próprio utilizador.');
        next();
    } else {
        console.log('Acesso negado: Tentativa de modificar outro utilizador.');
        return res.status(403).send({ message: 'Acesso proibido. Você só pode modificar o seu próprio perfil.' });
    }
};

