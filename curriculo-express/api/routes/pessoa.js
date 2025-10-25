import { Router } from 'express';
// Importa o controller e os middlewares
import pessoaController from '../controller/pessoaController.js';
import { isAuthenticated, isSelf } from '../middleware/authMiddleware.js'; // Usaremos isSelf para PUT/DELETE

const router = Router();

router.get('/', pessoaController.getAllPessoas);
router.get('/:id', pessoaController.getPessoaById);


router.post('/', isAuthenticated, pessoaController.createPessoa); 

router.put(
  '/:id',
  isAuthenticated,
  isSelf, // Middleware que verifica se req.user.id === req.params.id
  pessoaController.updatePessoa
);

router.delete(
  '/:id',
  isAuthenticated,
  isSelf,
  pessoaController.deletePessoa
);

export default router;

