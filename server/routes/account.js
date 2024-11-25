const express = require('express');
const authMiddleware = require('../middleware/auth');
const { pool } = require('../db/connect');
const router = express.Router(); // 'Router' yerine 'router' kullanımı

const getAccountByAccountId = async function (account_id) {
  try {
    const result = await pool.query(
      'SELECT * FROM account a INNER JOIN bank_user b ON a.userid = b.userid WHERE a.account_id=$1',
      [account_id]
    );
    return result.rows[0];
  } catch (error) {
    return null;
  }
};

async function getAccountByPersonelId(personel_id) {
  try {
    const result = await pool.query(
      'SELECT * FROM account a INNER JOIN bank_user b ON a.userid = b.userid WHERE b.personel_id=$1',
      [personel_id]
    );
    delete result.rows[0].password;
    return result.rows[0];
  } catch (error) {
    return null;
  }
}

router.get('/account', authMiddleware, async (req, res) => {
  try {
    const account = await getAccountByPersonelId(req.user.personel_id);
    if (account) {
      res.send({ account });
    } else {
      res.status(404).send({ get_error: 'Account details do not exist.' });
    }
  } catch (error) {
    res.status(500).send({ get_error: `Error while getting account details: ${error.message}` });
  }
});

router.post('/account', authMiddleware, async (req, res) => {
  const { account_no, bank_name, ifsc } = req.body;
  try {
    await pool.query(
      'INSERT INTO account (account_no, bank_name, ifsc, userid) VALUES ($1, $2, $3, $4)',
      [account_no, bank_name, ifsc, req.user.userid]
    );
    res.status(201).send();
  } catch (error) {
    res.status(500).send({
      add_error: 'Error while adding new account..Try again later.'
    });
  }
});

router.patch('/account', authMiddleware, async (req, res) => {
  const { ifsc } = req.body;
  try {
    const result = await pool.query(
      'UPDATE account SET ifsc=$1 WHERE userid=$2 RETURNING *',
      [ifsc, req.user.userid]
    );
    res.send({ account: result.rows[0] });
  } catch (error) {
    res.status(500).send({
      update_error: 'Error while updating account..Try again later.'
    });
  }
});

module.exports = router; // Doğru export
