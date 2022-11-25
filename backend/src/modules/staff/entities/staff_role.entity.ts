import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Staff } from './staff.entity';

@Entity({ name: 'staff_role' })
export class StaffRole {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 100, nullable: true })
  description: string;

  @Column({ name: 'position', type: 'integer', default: 0 })
  position: number;

  @OneToMany(() => Staff, (staff) => staff.role, { eager: true })
  staff: Staff[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
