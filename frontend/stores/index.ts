import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from '../reducers/authSlice';
import reservationReducer from '../reducers/reservationSlice';
import globalReducer from "../reducers/globalSlice";

export const store = configureStore({
  reducer: { auth: authReducer, reservation: reservationReducer, global: globalReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;