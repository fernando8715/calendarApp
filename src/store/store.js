import { configureStore } from '@reduxjs/toolkit'
import { calendarSlice, uiSlice } from './slices'


export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,

    ui: uiSlice.reducer
  },
})