export interface Hotel {
  id: number;
  taxcode: string;
  name: string;
  address: string;
  country: string;
  type: string;
  noChildren: boolean;
}

export interface HotelRoom {
  id: number;
  name: string;
  roomNumber: number[];
  hotelId: number;
  type: string;
  maxOccupancy: number,
  price: number;
  photo: string;
}