import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CreateAccountWithEmailAndPassword,
  LoginWithGoogle,
  LogoutUser,
  SignInWithEmailAndPassword,
} from '../../utils/AuthUtils';
import AUTH_CONST from '../constants/auth.constants';

// Action creator to handle authentication state change

export const login = (email, password) => dispatch => {
  dispatch({
    type: AUTH_CONST.LOGIN_REQUEST,
  });
  return SignInWithEmailAndPassword({email, password})
    .then(response => {
      if (response.success) {
        console.log('Auth Action Login Success User::', response.user);
        dispatch({
          type: AUTH_CONST.LOGIN_SUCCESS,
          payload: {user: response.user},
        });
        Promise.resolve();
        return response;
      } else {
        dispatch({
          type: AUTH_CONST.LOGIN_FAILURE,
          payload: response.message,
        });
        Promise.reject();
        return response;
      }
    })
    .catch(err => {
      console.log('Error from redux action in login user: ', err);
      dispatch({
        type: AUTH_CONST.LOGIN_FAILURE,
        payload: err?.code,
      });
      Promise.reject();
    });
};

export const logout = () => dispatch => {
  return LogoutUser()
    .then(res => {
      dispatch({
        type: AUTH_CONST.LOGOUT,
        payload: res.success,
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_CONST.LOGOUT,
        payload: error?.code,
      });
    });
};

export const googleLogin = () => dispatch => {
  dispatch({
    type: AUTH_CONST.LOGIN_REQUEST,
  });

  return LoginWithGoogle()
    .then(res => {
      if (res.success) {
        console.log('Auth Action Google Success User::', res.user);
        dispatch({
          type: AUTH_CONST.GOOGLE_SUCCESS,
          payload: {user: res.user},
        });
        Promise.resolve();
        return res;
      } else {
        dispatch({
          type: AUTH_CONST.GOOGLE_FAILURE,
          payload: res.message,
        });
        Promise.reject();
        return res;
      }
    })
    .catch(err => {
      console.log('Error from redux action in google login user: ', err);
      dispatch({
        type: AUTH_CONST.GOOGLE_FAILURE,
        payload: err?.code,
      });
      Promise.reject();
    });
};

export const register = (email, password) => dispatch => {
  dispatch({
    type: AUTH_CONST.REGISTER_REQUEST,
  });
  return CreateAccountWithEmailAndPassword({email, password})
    .then(response => {
      if (response.success) {
        console.log('Auth Action Register Success User::', response.user);
        dispatch({
          type: AUTH_CONST.REGISTER_SUCCESS,
          payload: response.message,
        });
        Promise.resolve();
        return response;
      } else {
        dispatch({
          type: AUTH_CONST.REGISTER_FAILURE,
          payload: response.message,
        });
        Promise.reject();
        return response;
      }
    })
    .catch(err => {
      console.log('Error from redux action in registering user: ', err);
      dispatch({
        type: AUTH_CONST.REGISTER_FAILURE,
        payload: err?.code,
      });
      Promise.reject(err);
    });
};
