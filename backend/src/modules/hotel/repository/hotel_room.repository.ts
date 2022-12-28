import { Repository } from 'typeorm';
import { HotelRoom } from '../entities/hotel_room.entity';
import { HotelRoomType } from '../enum/hotel_room.enum';

export class HotelRoomRepository extends Repository<HotelRoom> {
  async getAllRoomIdsOfHotel(hotelId: number) {
    const roomArray = await this.createQueryBuilder('rooms')
      .where('rooms.hotelId = :id', { id: hotelId })
      .addSelect('rooms.id')
      .getRawMany<{ id: number }>();
    return roomArray;
  }

  async getAllRoomByType(type: HotelRoomType) {
    const roomArray = await this.createQueryBuilder('rooms')
      .where('rooms.type = :type', { type })
      .getMany();
    return roomArray;
  }

  async getFreeRoomAtTime(
    checkIn: Date,
    checkOut: Date,
    hotelId: number,
    type?: HotelRoomType,
  ) {
    const totalRoom = await this.getAllRoomIdsOfHotel(hotelId);
    const query = await this.createQueryBuilder('rooms')
      .addSelect('rooms.id')
      .innerJoin('rooms.reservation', 'reservation')
      .where('rooms.hotelId = :id', { id: hotelId })
      .andWhere(
        '(reservation.checkInDate >= :dateStart AND reservation.checkOutDate =< :dateEnd)',
        { dateStart: checkIn, dateEnd: checkOut },
      );
    if (type) query.andWhere('rooms.type = :type', { type });
    const roomArray = await query.getRawMany<{ id: number }>();
    return totalRoom.filter((id) => !roomArray.includes(id));
  }

  async checkHasRoomNumberInHotel(hotelId: number, roomNumber: number) {
    const query = await this.createQueryBuilder('rooms')
      .where('rooms.hotelId = :id', { id: hotelId })
      .where(':number = ANY (rooms.roomNumber)', { number: roomNumber })
      .getCount()
    return query
  }
}
