import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'float' })
  rate: number;

  @ManyToOne(() => User)
  user: User;
}
