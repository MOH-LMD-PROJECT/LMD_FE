import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../rootReducer';
import user from '../slices/user';

const persistConfig = {
  key: 'root',
  storage,
  // Add any additional configuration options here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Include the authSlice reducer in the rootReducer
const rootReducerWithAuth = {
  ...persistedReducer,
  user: user,
};

const store = configureStore({
  reducer: rootReducerWithAuth,
  middleware: [thunkMiddleware],
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
