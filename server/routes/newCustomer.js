const express = require('express');
const { pool } = require('../db/connect'); // Veritabanı bağlantısını doğru şekilde içe aktarın
const router = express.Router(); // 'Router' yerine 'router' kullanımı

router.post('/', async (req, res) => {
  const { tckn, ad, soyad, dogumTarihi, cinsiyet, kimlikSeriNo, uyruk, anneAd, babaAd, telefonNo, email, adres } = req.body;

  // Önce mevcut müşteri kontrolü yapalım
  try {
    const existingCustomer = await pool.query('SELECT * FROM mvt_musteri WHERE tckn = $1', [tckn]);

    if (existingCustomer.rows.length > 0) {
      // Eğer müşteri zaten varsa, hata mesajı döndür
      return res.status(400).json({ error: 'Bu TCKN ile kayıtlı bir müşteri zaten mevcut.' });
    }

    // Veritabanı sorgusunu hazırlayın
    const query = `
      INSERT INTO mvt_musteri (tckn, ad, soyad, dogum_tarihi, cinsiyet, kimlik_seri_no, uyruk, anne_ad, baba_ad, telefon_no, email, adres)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;
    const values = [tckn, ad, soyad, dogumTarihi, cinsiyet, kimlikSeriNo, uyruk, anneAd, babaAd, telefonNo, email, adres];

    // Sorguyu çalıştırın
    await pool.query(query, values);
    res.status(201).json({ message: 'Müşteri başarıyla kaydedildi!' });
  } catch (error) {
    console.error('Error inserting customer:', error);
    res.status(500).json({ error: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
  }
});

module.exports = router;
