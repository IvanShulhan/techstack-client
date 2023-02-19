import { configureStore } from '@reduxjs/toolkit';
import apartmentsReducer from './slices/apartments';

export const store = configureStore({
  reducer: {
    apartments: apartmentsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

