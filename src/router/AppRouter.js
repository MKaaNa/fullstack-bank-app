import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Profile from '../components/Profile';
import Header from '../components/Header';
import Logout from '../components/Logout';

export const history = createBrowserHistory();

const AppRouter = ({ auth }) => {
  return (
    <BrowserRouter>
      <div>
        {!_.isEmpty(auth.token) && <Header />}
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppRouter);



