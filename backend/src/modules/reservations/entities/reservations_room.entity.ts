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

  @ManyToOne(() => Reservation, (res) => res.rooms)
  @JoinColumn()
  reservation: Reservation;

  @ManyToOne(() => HotelRoom, (room) => room.reservationRooms, {
    nullable: false,
  })
  @JoinColumn()
  hotelRoom: HotelRoom;

  @Column({ name: 'childrens', type: 'integer', comment: 'số trẻ em' })
  childrens: number;

  @Column({ array: true, type: 'integer' })
  childrens_age: number[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
