import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  // BeforeInsert,
  // BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ReservationStatus, PayStatus } from '../reservations.enum';

import { Hotel } from '@modules/hotel/entities/hotel.entity';
import { User } from '@modules/user/entities/user.entity';
import { Discount } from '@modules/discount/entities/discount.entity';
// import { HotelRoom } from '@modules/hotel/entities/hotel_room.entity';
import { ReservationsRoom } from './reservations_room.entity';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.reservations, { nullable: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, (user) => user.staffReservations, { nullable: true })
  @JoinColumn()
  staff: User;

  @ManyToOne(() => Hotel, (hotel) => hotel.reservations)
  @JoinColumn()
  hotel: Hotel;

  // TODO: Làm xong cơ bản rồi tính tiếp
  @OneToMany(() => ReservationsRoom, (res) => res.reservation, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  rooms: ReservationsRoom[];

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'guest', comment: 'số người lớn' })
  guests: number;

  @Column({ name: 'children', comment: 'số trẻ em' })
  childrens: number;

  @Column({ name: 'checkInDate', type: 'date' })
  checkIn: Date;

  @Column({ name: 'checkOutDate', type: 'date' })
  checkOut: Date;

  @Column({ type: 'boolean', default: false })
  isCancelled: boolean;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'kiểm tra xem đã check in chưa?',
  })
  checkedIn: boolean;

  @Column({ name: 'room_count', type: 'integer' })
  roomCount: number;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.REQUESTED,
  })
  status: ReservationStatus;

  @Column({ type: 'enum', enum: PayStatus })
  paidStatus: PayStatus;

  @Column({ type: 'int' })
  paidAmount: number;

  @Column({ nullable: true })
  cancelReason: string;

  @Column({ type: 'date', nullable: true })
  canceledAt: Date;

  @Column({ length: 255, comment: 'gửi request đặc biệt' })
  request: string;

  @ManyToOne(() => Discount, (discount) => discount.reservations, {
    nullable: true,
  })
  @JoinColumn()
  discount: Discount;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
