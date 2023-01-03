import { Repository, DataSource } from 'typeorm';
import { ReservationsRoom } from '../entities/reservations_room.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsRoomRepository extends Repository<ReservationsRoom> {
  constructor(private readonly datasource: DataSource) {
    super(
      ReservationsRoom,
      datasource.createEntityManager(),
      datasource.createQueryRunner(),
    );
  }
  async checkRoomIsAvailableInTime(
    checkIn: Date,
    checkOut: Date,
    roomId: number,
  ) {
    const [arr, count] = await this.createQueryBuilder('resRoom')
      .innerJoin('resRoom.reservation', 'reservations')
      .where(
        '(reservations.checkInDate >= :dateStart AND reservations.checkOutDate <= :dateEnd)',
        { dateStart: checkIn, dateEnd: checkOut },
      )
      .andWhere('resRoom.hotelRoomId = :id', { id: roomId })
      .getManyAndCount();
    return { arr, count };
  }
}
