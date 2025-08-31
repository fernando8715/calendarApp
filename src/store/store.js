import { configureStore } from '@reduxjs/toolkit'
import { calendarSlice, uiSlice, authSlice, eventSlice } from './'


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
    // events: eventSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})