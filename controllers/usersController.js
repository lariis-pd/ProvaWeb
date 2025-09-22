import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { util } from 'undici-types';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rotas = Router();
const filePath = path.join(__dirname, '..', 'utils', 'db.json');

const saveUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  };

  const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  };

  const register = (req, res) => {
    const { username, password } = req.body;
  
    const users = readUsersFromFile();
  
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }
  
    const newUser = { id: Date.now(), username, password };
    users.push(newUser);
  
    saveUsersToFile(users);
  
    const token = generateToken(newUser);
    res.status(201).json({ message: 'Usuário registrado com sucesso', token });
  };

  const login = (req, res) => {
    const { username, password } = req.body;
  
    const users = readUsersFromFile();
  
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  
    const token = generateToken(user);
    res.json({ message: 'Login bem-sucedido', token });
  };

  const atualiza = (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
  
    const users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
  
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  
    users[userIndex] = { id: users[userIndex].id, username, password };
    saveUsersToFile(users);
    res.json({ message: 'Usuário atualizado com sucesso' });
  };
  
  const deleteU = (req, res) => {
    const { id } = req.params;
  
    const users = readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
  
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  
    users.splice(userIndex, 1);
    saveUsersToFile(users);
  
    res.json({ message: 'Usuário deletado com sucesso' });
  };
  
  module.exports = { register, login,  atualiza, deleteU };
  