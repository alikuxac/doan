import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Hotel } from '@modules/hotel/entities/hotel.entity';
import { HotelRoomType as RoomType } from '../enum/hotel_room.enum';
import { ReservationsRoom } from '@modules/reservations/entities/reservations_room.entity';

@Entity({ name: 'hotel_room' })
export class HotelRoom {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 30, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, type: 'varchar' })
  description: string;

  @Column({ name: 'price', type: 'float' })
  price: number;

  @Column({ type: 'integer' })
  hotelId: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn()
  hotel: Hotel;

  @Column({
    name: 'type',
    type: 'enum',
    enum: RoomType,
    default: RoomType.SINGLE,
  })
  type: RoomType;

  @Column({ name: 'bed', type: 'integer' })
  bed: number;

  @Column({ name: 'max_occupancy', type: 'integer', nullable: false })
  maxOccupancy: number;

  @Column({ name: 'extra_bed', type: 'bool', default: false })
  extra_bed: boolean;

  @Column({ name: 'available', type: 'boolean', default: true })
  available: boolean;

  @Column({ name: 'photo', type: 'varchar' })
  photo: string;

  @Column('integer', { array: true })
  roomNumbers: number[];

  @OneToMany(() => ReservationsRoom, (res) => res.hotelRoom)
  reservationRooms: ReservationsRoom[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
