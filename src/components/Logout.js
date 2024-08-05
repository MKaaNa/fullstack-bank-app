// Logout.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initiateLogout } from '../actions/auth';

const Logout = ({ dispatch }) => {
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initiateLogout()).then(() => navigate('/'));
  }, [dispatch, navigate]);

  return null; // Hiçbir şey render etmeyecek
};

export default connect()(Logout);