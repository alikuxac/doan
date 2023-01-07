export interface Booking {
  id: number;
  hotel: string;
  checkin: Date;
  checkout: Date;
  adult: number;
  children: number;
  details: Array<{id: number, name: string, numbers: Array<number>}>
  price: number;
  status: string;
}