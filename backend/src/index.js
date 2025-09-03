require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <-- esto es nuevo
const pool = require('./db');
const app = express();

app.use(cors()); // <--- Nuevo
app.use(express.json());

// Ejemplo de ruta que lee usuarios de la base de datos
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO users (name) VALUES (?)', [name]);
    res.json({ id: result.insertId, name });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
