const express = require('express');
const authMiddleware = require('../middleware/auth');
const { pool } = require('../db/connect');
const { isInvalidField } = require('../utils/common');
const axios = require('axios'); // Use require instead of import
const Router = express.Router();

Router.post('/profile', authMiddleware, async (req, res) => {
  try {
    const { first_name, last_name } = req.body;

    // Define valid fields to update
    const validFieldsToUpdate = ['first_name', 'last_name'];
    const receivedFields = Object.keys(req.body);

    // Check for invalid fields
    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    );
    if (isInvalidFieldProvided) {
      return res.status(400).send({
        update_error: 'Invalid field.'
      });
    }

    // Perform the update query
    const result = await pool.query(
      'UPDATE bank_user SET first_name=$1, last_name=$2 WHERE userid=$3 RETURNING userid, first_name, last_name, personel_id',
      [first_name, last_name, req.user.userid]
    );
    res.send(result.rows[0]);
  } catch (error) {
    res.status(400).send({
      update_error: 'Error while updating profile. Try again later.'
    });
  }
});

Router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send({
      update_error: 'Error while getting profile data. Try again later.'
    });
  }
});

module.exports = Router;