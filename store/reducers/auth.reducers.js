import AsyncStorage from '@react-native-async-storage/async-storage';
import AUTH_CONSTANT from '../constants/auth.constants';
// const user = AsyncStorage.getItem('user');
// const isUserLoggedIn = AsyncStorage.getItem('isLogin');

// console.log('get Data', user());
// const initialState =
//   isAuthenticated() === 'true'
//     ? {isLoggedIn: true, user}
//     : {isLoggedIn: false, user: null, message: ''};

const initialState = {
  isLoggedIn: false,
  user: null,
  message: '',
  isUserLoggingIn: false,
};

export const authReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case AUTH_CONSTANT.LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        isUserLoggingIn: true,
        user: null,
      };
    case AUTH_CONSTANT.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isUserLoggingIn: false,
        user: payload.user,
      };
    case AUTH_CONSTANT.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isUserLoggingIn: false,

        message: payload,
      };
    case AUTH_CONSTANT.GOOGLE_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isUserLoggingIn: false,
        user: payload.user,
      };
    case AUTH_CONSTANT.GOOGLE_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        isUserLoggingIn: false,
        message: payload,
      };
    case AUTH_CONSTANT.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
