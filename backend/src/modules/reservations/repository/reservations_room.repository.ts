import { Repository } from 'typeorm';
import { ReservationsRoom } from '../entities/reservations_room.entity';

export class ReservationsRoomRepository extends Repository<ReservationsRoom> {
  async checkRoomIsAvailableInTime(
    checkIn: Date,
    checkOut: Date,
    roomId: number,
  ) {
    const [arr, count] = await this.createQueryBuilder('resRoom')
      .innerJoinAndSelect('resRoom.reservation', 'reservations')
      .where(
        '(reservations.checkInDate >= :dateStart AND reservations.checkOutDate =< :dateEnd)',
        { dateStart: checkIn, dateEnd: checkOut },
      )
      .andWhere('resRoom.hotelRoomId = :id', { id: roomId })
      .getManyAndCount();
      
  }
}
