const express = require('express');
const router = express.Router();
const { register, login,  atualiza, deleteU } = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

// Rotas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/users', authMiddleware, getAllUsers);
router.put('/user/:id', authMiddleware, updateUser);
router.delete('/user/:id', authMiddleware, deleteUser);

module.exports = router;
