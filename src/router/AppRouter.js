import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Header from '../components/Header';
import Logout from '../components/Logout';
import Dashboard from '../components/Dashboard';
import NewCustomer from '../components/NewCustomer';
import AccountOperations from '../components/AccountOperations';
import CustomerInfo from '../components/CustomerInfo';
import _ from 'lodash';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();



const AppRouter = ({ auth }) => {
  return (
    <Router>
      <div>
        {!_.isEmpty(auth.token) && <Header />}
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/newcustomer" element={<NewCustomer />} />
            <Route path="/customerinfo" element={<CustomerInfo />} />
            <Route path="/account-operations" element={<AccountOperations />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppRouter);
