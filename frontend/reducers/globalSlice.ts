import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../stores';

export interface GlobalState {
  step: number,
  isNextStepValid: boolean
}

const initialState: GlobalState = {
  step: 0,
  isNextStepValid: true,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setStep: (state, action) => { state.step = action.payload.step },
    setValid: (state, action) => { state.isNextStepValid = action.payload.valid }
  }
})

export const { setStep, setValid } = globalSlice.actions;

export default globalSlice.reducer;

export const selectGlobal = (state: RootState) => state.global;