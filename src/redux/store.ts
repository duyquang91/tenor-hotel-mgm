import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import roomReducer from './slices/roomsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;