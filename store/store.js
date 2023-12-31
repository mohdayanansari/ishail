import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import RootReducer from './reducers/root.reducers';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['auth'], //Things you want to persist
	blacklist: ['register'], //Things you don't want to persist
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
});

export const persistor = persistStore(store);
