import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Staff } from '@modules/staff/entities/staff.entity';
import { HotelRoom } from './/hotel_room.entity';

@Entity({ name: 'hotel' })
export class Hotel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'taxcode', type: 'varchar', length: 25, nullable: false })
  taxcode: string;

  @Column({ name: 'name', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ name: 'description', nullable: false, length: 255 })
  description: string;

  @Column({ name: 'address', nullable: false })
  address: string;

  @Column({ name: 'country', default: 'VN' })
  country: string;

  @OneToMany(() => Staff, (staff) => staff.hotel, {
    eager: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  staffs: Staff[];

  @OneToMany(() => HotelRoom, (room) => room.hotel, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  rooms: HotelRoom[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
