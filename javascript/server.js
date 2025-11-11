const express = require('express');
const { Client } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

const client = new Client({
  user: 'seu_usuario',   // Substitua pelo seu usuário do PostgreSQL
  host: 'localhost',
  database: 'locadora',  // Substitua pelo nome do seu banco de dados
  password: 'sua_senha', // Substitua pela sua senha do PostgreSQL
  port: 5432,
});

client.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/carros', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM carros');
    res.json(result.rows);  // Envia os dados em formato JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar carros');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
