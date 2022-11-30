import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcryptjs';

import { Hotel } from '@modules/hotel/entities/hotel.entity';
import { UserRole } from '../user.enum';
import { Reservation } from '@modules/reservations/entities/reservation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  displayName: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 20,
    nullable: true,
    default: null,
  })
  phone: string | null;

  @Column({
    type: 'date',
    nullable: false,
  })
  last_active: Date;

  @Column({ name: 'role', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ name: 'isAdmin', type: 'boolean', default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @ManyToOne(() => Hotel, (hotel) => hotel.users, {
    nullable: true,
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  hotel: Hotel | null;

  @OneToMany(() => Reservation, (res) => res.user, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  reservations: Reservation[];

  @OneToMany(() => Hotel, (hotel) => hotel.admin)
  admins: Hotel[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    if (!this.displayName) {
      this.displayName = this.username;
    }
    this.last_active = new Date();
  }

  @BeforeUpdate()
  async updatePasswordAndUpdatedDate() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
