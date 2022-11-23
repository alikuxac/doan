import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Hotel } from '@modules/hotel/entities/hotel.entity';

@Entity({ name: 'hotel_room' })
export class HotelRoom {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 30, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, type: 'varchar' })
  description: string;

  @Column('varchar', { name: 'assets', array: true })
  assets: string[];

  @ManyToOne(() => Hotel, {})
  hotel: Hotel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
