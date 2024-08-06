const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 5005;

// Veritabanı bağlantısı
const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'bank_account'
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint
app.post('/api/account', async (req, res) => {
  const { account_no, bank_name, ifsc } = req.body;
  console.log('Request body:', req.body); // Gelen veriyi loglayarak kontrol edin

  if (!account_no || !bank_name || !ifsc) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO accounts (account_no, bank_name, ifsc) VALUES ($1, $2, $3) RETURNING *',
      [account_no, bank_name, ifsc]
    );
    client.release();
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
