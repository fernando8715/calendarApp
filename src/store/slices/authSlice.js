import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState : {
    status : 'checking', // autenticated, not-authenticated,
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    checking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
  },
})
//Action creators are generated for each case reducer function//
export const { increment } = authSlice.actions;