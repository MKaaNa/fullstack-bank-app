import { BASE_API_URL } from '../utils/constants';
import { getErrors } from './errors';
import { UPDATE_PROFILE } from '../utils/constants';
import { get, post } from '../utils/api';
import { setAuthHeader } from '../utils/common';
import axios from 'axios';

export const updateProfile = (profile) => ({
  type: UPDATE_PROFILE,
  profile
});

export const initiateUpdateProfile = (profileData) => {
  return async (dispatch) => {
    try {
      const profile = await post(`${BASE_API_URL}/profile`, profileData);
      dispatch(updateProfile(profile.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const initiateGetProfile = (personel_id) => {
  return async (dispatch) => {
    try {
      setAuthHeader();
      const profile = await axios.get(`${BASE_API_URL}/profile`);
      dispatch(updateProfile(profile.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};