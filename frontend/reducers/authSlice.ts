import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../stores';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: true,
    isAdmin: false,
    token: "",
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      if (action.payload.isAdmin) state.isAdmin = true;
    },
    logout: (state, _action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.token = '';
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;