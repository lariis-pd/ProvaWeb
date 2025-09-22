const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.js');
const path = require('path');
const router = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/register', (req, res) => {});

app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
