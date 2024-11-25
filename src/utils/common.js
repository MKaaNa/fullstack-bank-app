import store from '../store/store';
import { initiateGetProfile } from '../actions/profile';
import { signIn } from '../actions/auth';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const validateFields = (fieldsToValidate) => {
  return fieldsToValidate.every((field) => Object.values(field)[0] !== '');
};

export const maintainSession = () => {
  const user_token = localStorage.getItem('user_token');
  if (user_token) {
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/register') {
    
    }
    const decoded = jwtDecode(user_token);
    updateStore(decoded);
  } else {
  
  }
};

export const setAuthHeader = () => {
  const token = localStorage.getItem('user_token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const removeAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export const updateStore = (user) => {
  const { userid, personel_id } = user;
  store.dispatch(
    signIn({
      userid,
      personel_id,
      token: localStorage.getItem('user_token')
    })
  );
  store.dispatch(initiateGetProfile(personel_id));
};