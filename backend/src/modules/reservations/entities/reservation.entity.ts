import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ReservationStatus, PayStatus } from '../reservations.enum';

import { Hotel } from '@modules/hotel/entities/hotel.entity';
import { User } from '@modules/user/entities/user.entity';
import { Discount } from '@modules/discount/entities/discount.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import { HotelRoom } from '@modules/hotel/entities/hotel_room.entity';

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

  @ManyToOne(() => HotelRoom, (room) => room.reservation)
  @JoinColumn()
  room: HotelRoom;

  @Column({ name: 'name', comment: 'tên người đặt' })
  name: string;

  @Column({ name: 'guest', comment: 'số người lớn' })
  guests: number;

  @Column({ name: 'checkInDate', type: 'date' })
  checkIn: Date;

  @Column({ name: 'checkOutDate', type: 'date' })
  checkOut: Date;

  @Column({ name: 'price', type: 'float' })
  price: number;

  @Column({ type: 'boolean', default: false })
  isCancelled: boolean;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'kiểm tra xem đã check in chưa?',
  })
  checkedIn: boolean;

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

  @OneToOne(() => Invoice, (invoice) => invoice.reservation, { nullable: true })
  @JoinColumn()
  invoice: Invoice;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
