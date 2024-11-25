const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router(); 

const { pool } = require('../db/connect');
const {
  validateUser,
  isInvalidField,
  generateAuthToken
} = require('../utils/common');
const authMiddleware = require('../middleware/auth');

// Signin endpoint
router.post('/signin', async (req, res) => {
  try {
    const { personel_id, password } = req.body;
    const user = await validateUser(personel_id, password);
  
    
    if (!user) {
      return res.status(400).send({
        signin_error: 'personel_id/password does not match.'
      });
    }
    const token = await generateAuthToken(user);
   
    const result = await pool.query(
      'INSERT INTO tokens (access_token, userid) VALUES ($1, $2) RETURNING *',
      [token, user.userid]
    );
   
    if (!result.rows[0]) {
      return res.status(400).send({
        signin_error: 'Error while signing in..Try again later.'
      });
    }
    
    user.token = result.rows[0].access_token;
    res.send(user);
  } catch (error) {
    
    res.status(400).send({
      signin_error: 'personel_id/password does not match.'
    });
  }
});

// Logout endpoint
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const { userid, access_token } = req.user;
    await pool.query('DELETE FROM tokens WHERE userid=$1 AND access_token=$2', [
      userid,
      access_token
    ]);
    res.send();
  } catch (error) {
    res.status(400).send({
      logout_error: 'Error while logging out..Try again later.'
    });
  }
});

module.exports = router;  // Export edilmelidir
