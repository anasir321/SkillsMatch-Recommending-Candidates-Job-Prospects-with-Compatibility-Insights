import wishlistSlice from './features/wishlist';
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './features/filterSlice';

export const store = configureStore({
  reducer: {
    filter:filterSlice,
    wishlist:wishlistSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch