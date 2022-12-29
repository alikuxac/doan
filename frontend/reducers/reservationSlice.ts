import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../stores';
import { Hotel } from '../interfaces/Hotel.interface';

export interface ReservationState {
  step: number,
  checkIn: Date | null,
  checkOut: Date | null,
  adult: number,
  children: number,
  rooms: number,
  hotelId: number,
  hotel: Hotel | null,
  roomId: number,
  roomNumber: Array<number>,
  userId: number | null
}

const initialState: ReservationState = {
  step: 0,
  checkIn: null,
  checkOut: null,
  adult: 1,
  children: 0,
  rooms: 1,
  hotelId: 0,
  hotel: null,
  roomId: 0,
  roomNumber: [],
  userId: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload.step;
    },
    setDate: (state, action) => {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
    },
    setHotel: (state, action ) => {
      state.hotel = action.payload.hotel;
    },
    setStepOne: (state, action) => {
      state.step = action.payload.step;
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
      state.adult = action.payload.adult;
      state.children = action.payload.children;
      state.rooms = action.payload.rooms;
      state.hotelId = action.payload.hotelId;
      state.hotel = action.payload.hotel
    }
  }
});

export const { setStep, setDate, setHotel, setStepOne } = reservationSlice.actions;

export default reservationSlice.reducer;

export const selectReservation = (state: RootState) => { return { 
  checkIn: state.reservation.checkIn,
  checkOut: state.reservation.checkOut,
  adult: state.reservation.adult,
  children: state.reservation.children,
  rooms: state.reservation.rooms,
  hotelId: state.reservation.hotelId,
  hotel: state.reservation.hotel,
} };
export const selectStep = (state: RootState) => { return { step: state.reservation.step } };