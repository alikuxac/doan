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

import { Hotel } from '@modules/hotel/entities/hotel.entity';
import { HotelRoomType } from './hotel_room_type.entity';

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

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { eager: true })
  hotel: Hotel;

  @OneToOne(() => HotelRoomType, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  type: HotelRoomType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
