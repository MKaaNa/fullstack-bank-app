import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddAccountForm = () => {
  const [account_no, setAccountNo] = useState('');
  const [bank_name, setBankName] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddAccount = async (event) => {
    event.preventDefault();
    const fieldsToValidate = [{ account_no }, { bank_name }, { ifsc }];
    const allFieldsEntered = fieldsToValidate.every((field) => Object.values(field)[0] !== '');

    if (!allFieldsEntered) {
      setErrorMsg('Please enter all the fields.');
      return;
    }

    try {
      const response = await axios.post(`${BASE_API_URL}/api/account`, { account_no, bank_name, ifsc });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      setErrorMsg('An error occurred. Please try again.');
    }
  };

  return (
    <div className="edit-account-form col-md-6 offset-md-3">
      <Form onSubmit={handleAddAccount} className="account-form">
        {errorMsg && <p className="errorMsg centered-message">{errorMsg}</p>}
        <Form.Group controlId="accnt_no">
          <Form.Label>Account number:</Form.Label>
          <Form.Control
            type="text"
            name="account_no"
            placeholder="Enter your account number"
            value={account_no}
            onChange={(e) => setAccountNo(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="bank_name">
          <Form.Label>Bank name:</Form.Label>
          <Form.Control
            type="text"
            name="bank_name"
            placeholder="Enter your bank name"
            value={bank_name}
            onChange={(e) => setBankName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="ifsc">
          <Form.Label>IFSC Code:</Form.Label>
          <Form.Control
            type="text"
            name="ifsc"
            placeholder="Enter new IFSC code"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddAccountForm;
