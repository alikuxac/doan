import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Hotel } from '@modules/hotel/entities/hotel.entity';
import {
  HotelRoomStatus,
  HotelRoomType as RoomType,
} from '../enum/hotel_room.enum';

@Entity({ name: 'hotel_room' })
export class HotelRoom {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 30, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, type: 'varchar' })
  description: string;

  @Column({ name: 'room_number', type: 'integer' })
  room_number: number;

  @Column({ name: 'price', type: 'decimal' })
  price: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: HotelRoomStatus,
    default: HotelRoomStatus.EMPTY,
  })
  status: HotelRoomStatus;

  @Column({ nullable: true })
  hotelId: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { eager: true })
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

  @Column({ name: 'max_people', type: 'integer' })
  max_people: number;

  @Column({ name: 'extra_bed', type: 'bool', default: false })
  extra_bed: boolean;

  @Column({ name: 'available', type: 'boolean', default: true })
  available: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
