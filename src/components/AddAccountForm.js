import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { validateFields } from '../utils/common';

import { initiateAddAccntDetails } from '../actions/account'; 
class AddAccountForm extends React.Component {
  state = {
    account_no: '',
    bank_name: '',
    ifsc: '',
    errorMsg: ''
  };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      this.setState({ errorMsg: this.props.errors });
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    const { account_no, bank_name, ifsc } = this.state;
    const fieldsToValidate = [{ account_no }, { bank_name }, { ifsc }];
    const allFieldsEntered = validateFields(fieldsToValidate);

    if (!allFieldsEntered) {
      this.setState({
        errorMsg: { add_error: 'Please fill all the fields.' }
      });
    } else {
      this.props.dispatch(initiateAddAccntDetails(account_no, bank_name, ifsc));
    }
  };

  render() {
    const { account_no, bank_name, ifsc, errorMsg } = this.state;

    return (
      <div className="edit-account-form col-md-6 offset-md-3">
        <Form onSubmit={this.handleOnSubmit}>
          {errorMsg && errorMsg.add_error && (
            <p className="errorMsg centered-message">{errorMsg.add_error}</p>
          )}
          <Form.Group controlId="account_no">
            <Form.Label>Account number:</Form.Label>
            <Form.Control
              type="text"
              name="account_no"
              placeholder="Enter your account number"
              value={account_no}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="bank_name">
            <Form.Label>Bank name:</Form.Label>
            <Form.Control
              type="text"
              name="bank_name"
              placeholder="Enter your bank name"
              value={bank_name}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="ifsc">
            <Form.Label>IFSC Code:</Form.Label>
            <Form.Control
              type="text"
              name="ifsc"
              placeholder="Enter new IFSC code"
              value={ifsc}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps)(AddAccountForm);

