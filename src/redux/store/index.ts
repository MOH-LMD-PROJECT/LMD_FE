
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../rootReducer';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 


const persistConfig = {
	key: "root",
	storage,
	// Add any additional configuration options here
};

//@ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
  middleware: [thunkMiddleware]
})

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
