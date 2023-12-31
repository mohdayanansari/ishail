import AsyncStorage from '@react-native-async-storage/async-storage';
import AUTH_CONSTANT from '../constants/auth.constants';

const user = AsyncStorage.getItem('user');

const initialState = user
  ? {isUserRegistered: true, isUserRegistering: false}
  : {isUserRegistered: false, message: '', isUserRegistering: false};

export const registerReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case AUTH_CONSTANT.REGISTER_REQUEST:
      return {
        ...state,
        isUserRegistering: true,
      };
    case AUTH_CONSTANT.REGISTER_SUCCESS:
      return {
        ...state,
        isUserRegistered: true,
        isUserRegistering: false,
        message: payload,
      };
    case AUTH_CONSTANT.REGISTER_FAILURE:
      return {
        ...state,
        isUserRegistered: false,
        isUserRegistering: false,
        message: payload,
      };
    default:
      return state;
  }
};
