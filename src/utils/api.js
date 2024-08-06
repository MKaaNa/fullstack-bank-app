import axios from 'axios';
import { setAuthHeader, removeAuthHeader } from './common';

export const get = async (url, params, shouldSetAuthHeader = true, shouldRemoveAuthHeader = false) => {
  if (shouldSetAuthHeader) {
    setAuthHeader();
  }

  try {
    const result = await axios.get(url, { params });
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  } finally {
    if (shouldRemoveAuthHeader) {
      removeAuthHeader();
    }
  }
};

export const post = async (url, params, shouldSetAuthHeader = true, shouldRemoveAuthHeader = false) => {
  if (shouldSetAuthHeader) {
    setAuthHeader();
  }

  try {
    const result = await axios.post(url, params);
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  } finally {
    if (shouldRemoveAuthHeader) {
      removeAuthHeader();
    }
  }
};

export const patch = async (url, params, shouldSetAuthHeader = true, shouldRemoveAuthHeader = false) => {
  if (shouldSetAuthHeader) {
    setAuthHeader();
  }

  try {
    const result = await axios.patch(url, params);
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  } finally {
    if (shouldRemoveAuthHeader) {
      removeAuthHeader();
    }
  }
};
