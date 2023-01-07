import { Repository, DataSource } from 'typeorm';
import { HotelRoom } from '../entities/hotel_room.entity';
import { HotelRoomType } from '../enum/hotel_room.enum';
import { Injectable } from '@nestjs/common';
@Injectable()
export class HotelRoomRepository extends Repository<HotelRoom> {
  constructor(private readonly datasource: DataSource) {
    super(
      HotelRoom,
      datasource.createEntityManager(),
      datasource.createQueryRunner(),
    );
  }

  async getAllRoomIdsOfHotel(hotelId: number) {
    const roomArray = await this.createQueryBuilder('rooms')
      .where('rooms.hotelId = :id', { id: hotelId })
      .getMany();
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
      .innerJoin('rooms.hotel', 'hotel')
      .where('rooms.hotelId = :id', { id: hotelId })
      .andWhere(
        '(reservation.checkInDate >= :dateStart AND reservation.checkOutDate <= :dateEnd)',
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
      .getCount();
    return query;
  }

  async checkRoomNumberExist(roomNumbers: number[], hotelId: number) {
    const count = await this.createQueryBuilder('rooms')
      .where('rooms.roomNumber && ARRAY[:...numbers]', { numbers: roomNumbers })
      .andWhere('rooms.hotelId = :id', { id: hotelId })
      .getCount();
    return count > 0 ? true : false;
  }

  async getAvailableRoom(hotelId: number, checkIn: Date, checkOut: Date) {
    const rooms = await this.createQueryBuilder('rooms')
      .addSelect('rooms.*')
      .innerJoin('rooms.reservation', 'reservation')
      .innerJoin('rooms.hotel', 'hotel')
      .where('rooms.hotelId = :id', { id: hotelId })
      .printSql()
      // .andWhere(
      //   '(reservation.checkInDate >= :dateStart AND reservation.checkOutDate <= :dateEnd)',
      //   { dateStart: checkIn, dateEnd: checkOut },
      // )
      .getMany();
    return { rooms: rooms, count: rooms.length };
  }

  async selectRandomPhotos() {
    const photos = await this.createQueryBuilder('rooms')
      .select('rooms.photo')
      .orderBy('RANDOM()')
      .limit(3)
      .getMany();
    return photos;
  }
}
