import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Index,
  Generated,
} from 'typeorm';
import { discountStrategies } from '../strategies/discountStrategy';
import { DiscountType, DiscountStatus } from '../discount.enum';
// import { customAlphabet } from 'nanoid';

import { Reservation } from '@modules/reservations/entities';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100, unique: true })
  @Index()
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  @Generated('uuid')
  @Index()
  code: string;

  @Column({ type: 'enum', enum: DiscountType })
  type: DiscountType;

  @Column({ type: 'enum', enum: DiscountStatus })
  status: DiscountStatus;

  @Column({ type: 'int' })
  percent: number;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'int' })
  total: number;

  @Column({ type: 'int', default: 0 })
  used: number;

  @Column({ type: 'boolean', default: false })
  isDeleted: false;

  @OneToMany(() => Reservation, (reservation) => reservation.discount)
  reservations: Reservation[];

  // @BeforeInsert()
  // generateCode() {
  //   const nanoid = customAlphabet('qwertyuiopasdfghjklzxcvbnm0123456789', 10);
  //   this.code = nanoid();
  // }

  calculateDiscountFee(price: number, stayDays: number): number {
    let result = 0;

    const now = new Date();
    if (
      this.endDate.getTime() !== null &&
      this.endDate.getTime() < now.getTime()
    ) {
      return result;
    }

    const isSatisfied = discountStrategies[this.type].isSatisfied(stayDays);
    if (isSatisfied) result += price * (this.percent * 0.01);

    return result;
  }
}
