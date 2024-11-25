const express = require('express');
const router = express.Router();
const { getCustomerByTckn } = require('../routes/customerController');
const { pool } = require('../db/connect');

// Tüm müşterileri getiren route
router.get('/', async (req, res) => {
  const { includePassive } = req.query;
  const showPassive = includePassive === 'true'; // Checkbox işaretli mi?

  let query = 'SELECT * FROM mvt_musteri';
  let values = [];

  if (!showPassive) {
    // Aktif müşterileri filtrele
    query += ' WHERE aktiflik_durumu = $1';
    values.push(1);
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Veri getirme hatası:', err);
    res.status(500).json({ error: 'Müşteriler alınırken bir hata oluştu.' });
  }
});

// TCKN'ye göre müşteri bilgilerini getiren route
router.get('/:tckn', async (req, res) => {
  try {
    const tckn = req.params.tckn;
    const customer = await getCustomerByTckn(tckn);

    if (!customer) {
      return res.status(404).json({ message: 'Müşteri bulunamadı.' });
    }

    res.json(customer);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

// Müşteriyi pasif duruma getiren route
router.put('/pasif/:tckn', async (req, res) => {
  const tckn = req.params.tckn;

  try {
    const result = await pool.query('UPDATE mvt_musteri SET aktiflik_durumu = 0 WHERE tckn = $1', [tckn]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Müşteri bulunamadı.' });
    }

    res.status(200).json({ message: 'Müşteri pasif duruma getirildi.' });
  } catch (err) {
    console.error('Veritabanı hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

// Müşteriyi aktif duruma getiren route
router.put('/aktif/:tckn', async (req, res) => {
  const tckn = req.params.tckn;

  try {
    const result = await pool.query('UPDATE mvt_musteri SET aktiflik_durumu = 1 WHERE tckn = $1', [tckn]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Müşteri bulunamadı.' });
    }

    res.status(200).json({ message: 'Müşteri aktif duruma getirildi.' });
  } catch (err) {
    console.error('Veritabanı hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

module.exports = router;
