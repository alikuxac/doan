import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Hotel } from '@modules/hotel/entities/hotel.entity';
import { User } from '@modules/user/entities/user.entity';
import { ReservationsRoom } from './reservations_room.entity';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.reservations, { nullable: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Hotel, (hotel) => hotel.reservations)
  @JoinColumn()
  hotel: Hotel;

  @OneToMany(() => ReservationsRoom, (res) => res.reservation, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  rooms: ReservationsRoom[];

  @Column({ name: 'name' })
  name: string;

  @Column({ type: 'date' })
  checkIn: Date;

  @Column({ name: 'guest' })
  guests: number;

  @Column({ name: 'children' })
  childrens: number;

  @Column({ type: 'date' })
  checkOut: Date;

  @Column({ type: 'boolean', default: false })
  isCancelled: boolean;

  @Column({ type: 'boolean', default: false })
  checkedIn: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  count() {
    let totalAdults = 0,
      totalChildren = 0;
    for (const room of this.rooms) {
      totalAdults += room.adults;
      totalChildren += room.childrens;
    }
    this.childrens = totalChildren;
    this.guests = totalAdults;
  }
}
