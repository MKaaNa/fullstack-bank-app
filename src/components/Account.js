import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import AccountForm from './AccountForm';
import Summary from './Summary';
import axios from 'axios';

class Account extends React.Component {
  state = {
    selectedType: 'withdraw',
    data: null
  };

  fetchData = () => {
    axios.get('http://localhost:5005/account')
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error('API Hatası:', error);
      });
  };
  

  setSelectedType = (selectedType) => {
    this.setState({ selectedType });
  };

  render() {
    const { selectedType, data } = this.state;

    return (
      <div>
        <div className="account">
          <Button
            variant="primary"
            className={`${
              selectedType === 'account' ? 'active account-btn' : 'account-btn'
            }`}
            onClick={() => this.setSelectedType('account')}
          >
            Withdraw
          </Button>
          <Button
            variant="secondary"
            className={`${
              selectedType === 'deposit' ? 'active account-btn' : 'account-btn'
            }`}
            onClick={() => this.setSelectedType('deposit')}
          >
            Deposit
          </Button>
          <Button
            variant="info"
            className={`${
              selectedType === 'summary' ? 'active account-btn' : 'account-btn'
            }`}
            onClick={() => this.setSelectedType('summary')}
          >
            Summary
          </Button>
          <Button
            variant="success"
            onClick={this.fetchData}
          >
            Fetch Data
          </Button>
        </div>
        <div>
          {selectedType === 'withdraw' || selectedType === 'deposit' ? (
            <AccountForm selectedType={selectedType} />
          ) : (
            <Summary />
          )}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      </div>
    );
  }
}

export default Account;

