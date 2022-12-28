import { BadRequestException, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reservation } from '../entities';
// import { HotelRoom } from '@modules/hotel/entities/hotel_room.entity';
// import { ReservationsRoom } from '../entities/reservations_room.entity';

export class ReservationRepository extends Repository<Reservation> {
  checkDateValid(checkIn: Date, checkOut) {
    if (checkIn.getTime() < new Date().getTime()) {
      throw new NotAcceptableException('Checkin date must be after now');
    }
    if (checkOut.getTime() < checkIn.getTime()) {
      throw new NotAcceptableException(
        'Checkout date must be after checkin date',
      );
    }
  }

  async getFreeRoomAtTime(checkIn: Date, checkOut: Date, roomIds: number[]) {
    try {
      const [freeRoomsQuery, count] = await this.createQueryBuilder(
        'reservations',
      )
        .innerJoin('reservations.rooms', 'rooms')
        .innerJoin('rooms.hotelRoom', 'hotelRoom')
        .addSelect('hotelRoom.id', 'roomId')
        .where(
          '(reservations.checkInDate >= :dateStart AND reservations.checkOutDate =< :dateEnd)',
          { dateStart: checkIn, dateEnd: checkOut },
        )
        .andWhere('reservations.isCancelled = :cancel', { cancel: false })
        .andWhere('hotelRoom.id NOT IN (:ids)', { ids: roomIds })
        .getManyAndCount();
      if (count === 0) {
        throw new BadRequestException('No free room left');
      }
      const freeRooms = [];
      return freeRooms;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async checkIfRoomHasReservationInDate(
    checkIn: Date,
    checkOut: Date,
    roomId: number,
  ) {
    try {
      const count = await this.createQueryBuilder('reservations')
        .innerJoinAndSelect('reservations.rooms', 'rooms')
        .innerJoinAndSelect('rooms.hotelRoom', 'hotelRoom')
        .where(
          '(reservations.checkInDate >= :dateStart AND reservations.checkOutDate =< :dateEnd)',
          { dateStart: checkIn, dateEnd: checkOut },
        )
        .andWhere('reservations.isCancelled = :cancel', { cancel: false })
        .andWhere('hotelRoom.id = :id', { id: roomId })
        .getCount();
      return count > 0 ? false : true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async countRoomLeftInDateRange(checkIn: Date, checkOut: Date) {
    try {
      const a = await this.createQueryBuilder('reservations');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
