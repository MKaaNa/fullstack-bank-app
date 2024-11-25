const { pool } = require('../db/connect'); // PostgreSQL bağlantı modülü

// Tüm müşterileri getiren fonksiyon
const getAllCustomers = async () => {
  try {
    const result = await pool.query('SELECT * FROM mvt_musteri');
    return result.rows;
  } catch (error) {
    console.error('Veritabanı sorgu hatası:', error);
    throw new Error('Veritabanı sorgu hatası.');
  }
};

// TCKN'ye göre müşteri bilgilerini getiren fonksiyon
const getCustomerByTckn = async (tckn) => {
  try {
    const result = await pool.query('SELECT * FROM mvt_musteri WHERE tckn = $1', [tckn]);
    return result.rows[0];
  } catch (error) {
    console.error('Veritabanı sorgu hatası:', error);
    throw new Error('Veritabanı sorgu hatası.');
  }
};

// Müşteriyi pasif duruma getirme (silme yerine)
const markCustomerAsPassive = async (tckn) => {
  try {
    const result = await pool.query(
      'UPDATE mvt_musteri SET aktiflik_durumu = 0 WHERE tckn = $1',
      [tckn]
    );
    if (result.rowCount === 0) {
      throw new Error('Müşteri bulunamadı.');
    }
  } catch (error) {
    console.error('Veritabanı sorgu hatası:', error);
    throw new Error('Veritabanı sorgu hatası.');
  }
};


module.exports = {
  getAllCustomers,
  getCustomerByTckn,
  markCustomerAsPassive
};




