import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import gridReducer from './grid/gridSlice'
import notesReducer from './notes/notesSlice'
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    user: userReducer,
    grid: gridReducer,
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;