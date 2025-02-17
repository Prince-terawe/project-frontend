import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import toastReducer from './slice/toastSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

// Persist configuration
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Storage engine (localStorage by default)
};

// Wrap the auth reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedToastReducer = persistReducer(persistConfig, toastReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    toast: toastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
        ],
      },
    }),
});

export const persistor = persistStore(store);
