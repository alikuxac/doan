export interface Hotel {
  id: number;
  name: string;
  address: string;
  country: string;
  type: string;
}

export interface HotelRoom {
  id: number;
  name: string;
  hotelId: number;
  type: string;
  maxOccupancy: number,
  extra_bed: boolean;
  available: boolean;
  allowRefund: boolean;
  price: number;
  photo: string;
}