import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../stores';
import { Hotel } from '../interfaces/Hotel.interface';
import { ISelectedRoom } from '../interfaces/Select.interface';
export interface ReservationState {
  checkIn: string | null,
  checkOut: string | null,
  guest: number,
  hotelId: number,
  hotel: Hotel | null,
  roomId: number,
  userId: number | null
}

const initialState: ReservationState = {
  checkIn: null,
  checkOut: null,
  guest: 1,
  hotelId: 1,
  hotel: null,
  roomId: 0,
  userId: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
    },
    setHotel: (state, action ) => {
      state.hotel = action.payload.hotel;
    },
    setStepOne: (state, action) => {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
      state.guest = action.payload.guest;
      state.hotelId = action.payload.hotelId;
      state.hotel = action.payload.hotel
    }
  }
});

export const { setDate, setHotel, setStepOne } = reservationSlice.actions;

export default reservationSlice.reducer;

export const selectReservation = (state: RootState) => { return { 
  checkIn: state.reservation.checkIn,
  checkOut: state.reservation.checkOut,
  guest: state.reservation.guest,
  hotelId: state.reservation.hotelId,
  hotel: state.reservation.hotel,
  roomId: state.reservation.roomId,
} };