import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Entity,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import { StaffRole } from './staff_role.entity';
import { User } from '@modules/user/entities/user.entity';
import { Hotel } from '@modules/hotel/entities/hotel.entity';

@Entity({ name: 'staff' })
export class Staff {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'start_date', type: 'date', nullable: false })
  startDate: Date;

  @ManyToOne(() => StaffRole, (staffRole) => staffRole.staff, {
    eager: true,
  })
  role: StaffRole;

  @OneToOne(() => User, (user) => user.staff)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Hotel, (hotel) => hotel.staffs)
  hotel: Hotel;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
