import {combineReducers} from 'redux';
import {authReducer} from './auth.reducers';
import {registerReducer} from './registration.reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
});

export default rootReducer;
