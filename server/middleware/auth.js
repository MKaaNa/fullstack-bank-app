const jwt = require('jsonwebtoken');
const { pool } = require('../db/connect');

const authMiddleware = async function (req, res, next) {
  try {
    // Authorization başlığını alın
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ auth_error: 'No token provided or invalid format.' });
    }

    // Token'ı ayırın
    const token = authHeader.split(' ')[1];
    
    // Token'ı doğrulayın
    const decoded = jwt.verify(token, process.env.SECRET);

    // Kullanıcıyı veritabanından alın
    const result = await pool.query(
      'SELECT userid, first_name, last_name, personnel_id FROM bank_user WHERE userid = $1',
      [decoded.userid]
    );

    const user = result.rows[0];
    if (user) {
      req.user = user;
      req.token = token;
      next();
    } else {
      res.status(401).send({ auth_error: 'User not found or invalid token.' });
    }
  } catch (error) {
    console.error('Authentication Error:', error.message); // Hataları daha detaylı loglayın
    res.status(400).send({
      auth_error: 'Authentication failed.'
    });
  }
};

module.exports = authMiddleware;
