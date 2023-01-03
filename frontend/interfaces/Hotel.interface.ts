export interface Hotel {
  id: number;
  name: string;
  city: string;
  noChildren: boolean;
}

export interface HotelRoom {
  roomId: number;
  name: string;
  roomNumbers: number[];
  hotelId: number;
  type: string;
  maxOccupancy: number,
  price: number;
  photo: string;
}