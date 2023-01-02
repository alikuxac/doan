import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../stores';
import { Hotel } from '../interfaces/Hotel.interface';
import { ISelectedRoom } from '../components/client/RoomView/RoomDetails/RoomDetails';
export interface ReservationState {
  checkIn: Date | null,
  checkOut: Date | null,
  adult: number,
  children: number,
  rooms: number,
  hotelId: number,
  hotel: Hotel | null,
  roomNumber: ISelectedRoom[],
  userId: number | null
}

const initialState: ReservationState = {
  checkIn: null,
  checkOut: null,
  adult: 1,
  children: 0,
  rooms: 1,
  hotelId: 1,
  hotel: null,
  roomNumber: [],
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
      state.roomNumber = [];
    },
    setStepOne: (state, action) => {
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

export const { setDate, setHotel, setStepOne } = reservationSlice.actions;

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