import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../stores';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    isAdmin: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      if (action.payload.isAdmin) state.isAdmin = true;
    },
    logout: (state, _action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isAdmin = false;
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;