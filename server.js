const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const router = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/register', (req, res) => {});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
