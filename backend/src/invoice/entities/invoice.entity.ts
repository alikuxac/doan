import { Reservation } from '@modules/reservations/entities';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PaidStatus {
  Paid = 'Paid',
  Not_Paid = 'Not Paid',
}

@Entity({ name: 'invoice' })
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  full_name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'price', type: 'integer' })
  price: number;

  @Column({ name: 'status', enum: PaidStatus, default: PaidStatus.Not_Paid })
  status: string;

  @Column({ name: 'reservationId' })
  reservationId: string;

  @OneToOne(() => Reservation, (res) => res.invoice)
  @JoinColumn()
  reservation: Reservation;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
