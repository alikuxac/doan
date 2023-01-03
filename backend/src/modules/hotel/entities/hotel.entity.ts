import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';

import { HotelRoom } from './/hotel_room.entity';
import { User } from '@modules/user/entities/user.entity';
import { Reservation } from '@modules/reservations/entities/reservation.entity';
import { HotelType } from '../enum/hotel.enum';

@Entity({ name: 'hotel' })
export class Hotel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Unique('uq_taxcode', ['taxcode'])
  @Column({ name: 'taxcode', type: 'varchar', length: 25 })
  taxcode: string;

  @Column({ name: 'name', length: 100 })
  @Unique('uq_name', ['name'])
  name: string;

  @Column({ name: 'description', length: 255 })
  description: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'country' })
  country: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: HotelType,
    default: HotelType.Hotel,
  })
  type: HotelType;

  @Column({ name: 'no_children', type: 'boolean', default: false })
  noChildren: boolean;

  @Column({ nullable: true })
  adminId: number;

  @ManyToOne(() => User, (user) => user.admins, {
    onDelete: 'SET NULL',
    // eager: true,
  })
  @JoinColumn()
  admin: User;

  @OneToMany(() => User, (user) => user.hotel, {
    onDelete: 'SET NULL',
  })
  users: User[];

  @OneToMany(() => HotelRoom, (room) => room.hotel, {
    cascade: true,
    // eager: true,
    onDelete: 'CASCADE',
  })
  rooms: HotelRoom[];

  @OneToMany(() => Reservation, (res) => res.hotel, {
    onDelete: 'CASCADE',
  })
  reservations: Reservation[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
