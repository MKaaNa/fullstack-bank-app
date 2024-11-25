import axios from 'axios';
import { SIGN_IN, SIGN_OUT, BASE_API_URL } from '../utils/constants';
import { initiateGetProfile } from './profile';
import { history } from '../router/AppRouter';
import { getErrors } from './errors';
import { setAuthHeader, removeAuthHeader } from '../utils/common';

export const signIn = (user) => ({
  type: SIGN_IN,
  user
});

export const initiateLogin = (personnelId, password) => {
  return async (dispatch) => {
    try {
      const result = axios.post(`${BASE_API_URL}/signin`, {
        personnelId,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const user = result.data;
      localStorage.setItem('user_token', user.token);
      dispatch(signIn(user));
      dispatch(initiateGetProfile(user.personnelId));
      history.push('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.log('error', error);
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};


export const registerNewUser = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_API_URL}/signup`, data);
      return { success: true };
    } catch (error) {
      console.log('error', error);
      error.response && dispatch(getErrors(error.response.data));
      return { success: false };
    }
  };
};

export const signOut = () => ({
  type: SIGN_OUT
});

export const initiateLogout = () => {
  return async (dispatch) => {
    try {
      setAuthHeader();
      await axios.post(`${BASE_API_URL}/logout`);
      removeAuthHeader();
      localStorage.removeItem('user_token');
      return dispatch(signOut());
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};