import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';

import { HotelRoom } from '@modules/hotel/entities/hotel_room.entity';

@Entity({ name: 'reservations_room' })
export class ReservationsRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reservation, (res) => res.rooms, { onDelete: 'CASCADE' })
  @JoinColumn()
  reservation: Reservation;

  @ManyToOne(() => HotelRoom, (room) => room.reservationRooms, {
    nullable: false,
  })
  @JoinColumn()
  hotelRoom: HotelRoom;

  @Column({ name: 'room_numbers', type: 'integer', comment: 'số phòng chọn' })
  roomNumbers: number[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
