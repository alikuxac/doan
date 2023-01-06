import { Repository, DataSource } from 'typeorm';
import { Hotel } from '../entities/hotel.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelRepository extends Repository<Hotel> {
  constructor(private readonly datasource: DataSource) {
    super(
      Hotel,
      datasource.createEntityManager(),
      datasource.createQueryRunner(),
    );
  }

  async countByType() {
    const hotelCount = await this.createQueryBuilder('hotel')
      .select(['COUNT(hotel.type) as count', 'hotel.type as type'])
      .addGroupBy('hotel.type')
      .getRawMany();
    return hotelCount;
  }
}
