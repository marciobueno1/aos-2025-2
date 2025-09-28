cat > src/routes/users.js << 'EOF'
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// LIST
router.get('/', async (req, res, next) => {
  try {
    const list = await User.findAll();
    res.json(list);
  } catch (err) { next(err); }
});

// GET by ID
router.get('/:id', async (req, res, next) => {
  try {
    const u = await User.findByPk(req.params.id);
    if (!u) return res.status(404).json({ error: 'User not found' });
    res.json(u);
  } catch (err) { next(err); }
});

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const created = await User.create({ name, email });
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const u = await User.findByPk(req.params.id);
    if (!u) return res.status(404).json({ error: 'User not found' });
    const { name, email } = req.body;
    await u.update({ name, email });
    res.json(u);
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send(); // sem conteúdo
  } catch (err) { next(err); }
});

export default router;
EOF
