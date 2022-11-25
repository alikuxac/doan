import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'hotel_room_type ' })
export class HotelRoomType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 30, type: 'varchar', unique: true })
  name: string;

  @Column({ name: 'description', length: 100, type: 'varchar', default: '' })
  description: string;

  @Column({ name: 'bed', type: 'integer' })
  bed: number;

  @Column({ name: 'max_people', type: 'integer' })
  max_people: number;

  @Column({ name: 'extra_bed', type: 'bool', default: false })
  extra_bed: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
