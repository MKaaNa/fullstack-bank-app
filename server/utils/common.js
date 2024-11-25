const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/connect');

const isInvalidField = (receivedFields, validFieldsToUpdate) => {
  return receivedFields.some(
    (field) => validFieldsToUpdate.indexOf(field) === -1
  );
};

const validateUser = async (personelId, password) => {
  try {
    
    const result = await pool.query('SELECT * FROM bank_user WHERE personel_id = $1', [personelId]);
    
    const user = result.rows[0];

    if (!user) {
      throw new Error('User not found');
    }
   
    const isMatch = password == user.password;
  
    
    if (isMatch) {
      return user;
    } else {
      throw new Error('Password does not match');
    }
  } catch (error) {
    console.error('Validation error:', error);
    throw new Error(`Validation error: ${error.message}`);
  }
};

const generateAuthToken = async (user) => {
  const { userid, personel_id } = user;
  const secret = process.env.SECRET;
  
  const token = await jwt.sign({ userid, personel_id }, secret);
  return token;
};

module.exports = {
  isInvalidField,
  validateUser,
  generateAuthToken
};