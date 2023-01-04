import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../stores';
import { User } from '../interfaces/User.interface';

export interface IinitialState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string;
}

const initialState: IinitialState = {
  user: null,
  isAuthenticated: true,
  isAdmin: false,
  token: ""
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      if (action.payload.isAdmin) state.isAdmin = true;
    },
    logout: (state, action) => {
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