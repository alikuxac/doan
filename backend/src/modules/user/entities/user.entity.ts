import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BeforeUpdate,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import bcrypt from 'bcryptjs';

import { Staff } from '@modules/staff/entities/staff.entity';
import { UserRole } from '../user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  password: string | null;

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  displayName: string | null;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
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

  @OneToOne(() => Staff, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'staffId', referencedColumnName: 'id' })
  staff: Staff;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
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
