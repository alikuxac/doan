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

import { HotelRoomType } from '@modules/hotel/enum/hotel_room.enum';

@Entity({ name: 'reservations_room' })
export class ReservationsRoom {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Reservation, (res) => res.rooms)
  @JoinColumn()
  reservation: Reservation;

  @Column({ name: 'bed', type: 'integer', default: 1 })
  bed: number;

  @Column({ name: 'adults', type: 'integer' })
  adults: number;

  @Column({ name: 'childrens', type: 'integer' })
  childrens: number;

  @Column({ name: 'extra_bed', type: 'boolean' })
  extra_bed: boolean;

  @Column({ name: 'type' })
  type: HotelRoomType;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
