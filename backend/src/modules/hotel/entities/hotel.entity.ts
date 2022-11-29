import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { HotelRoom } from './/hotel_room.entity';
import { User } from '@modules/user/entities/user.entity';
import { Reservation } from '@modules/reservations/entities/reservation.entity';

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

  @ManyToOne(() => User, (user) => user.admins, { onDelete: 'SET NULL' })
  @JoinColumn()
  admin: User;

  @OneToMany(() => User, (user) => user.hotel, {
    onDelete: 'SET NULL',
  })
  users: User[];

  @OneToMany(() => HotelRoom, (room) => room.hotel, {
    cascade: true,
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
