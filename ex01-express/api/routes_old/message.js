cat > src/routes/messages.js << 'EOF'
import express from 'express';
import Message from '../models/Message.js';
import User from '../models/User.js';

const router = express.Router();

// LIST (com user associado)
router.get('/', async (req, res, next) => {
  try {
    const list = await Message.findAll({ include: [{ model: User, as: 'user' }] });
    res.json(list);
  } catch (err) { next(err); }
});

// GET by ID
router.get('/:id', async (req, res, next) => {
  try {
    const m = await Message.findByPk(req.params.id, { include: [{ model: User, as: 'user' }] });
    if (!m) return res.status(404).json({ error: 'Message not found' });
    res.json(m);
  } catch (err) { next(err); }
});

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const { text, userId } = req.body;
    const exists = await User.findByPk(userId);
    if (!exists) return res.status(404).json({ error: 'User not found' });
    const created = await Message.create({ text, userId });
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const m = await Message.findByPk(req.params.id);
    if (!m) return res.status(404).json({ error: 'Message not found' });
    await m.update({ text: req.body.text });
    res.json(m);
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Message.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Message not found' });
    res.status(204).send();
  } catch (err) { next(err); }
});

export default router;
EOF
