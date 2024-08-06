const express = require('express');
const cors = require('cors');
const { pool } = require('./db');  // db.js dosyasından pool'u import edin
const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

app.get('/api/account', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM accounts');  // Veritabanındaki 'accounts' tablosundan verileri çeker
    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
