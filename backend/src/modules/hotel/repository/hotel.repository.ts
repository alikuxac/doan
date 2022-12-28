import { Repository } from "typeorm";
import { Hotel } from "../entities/hotel.entity";

export class HotelRepository extends Repository<Hotel> {
  async countByType() {
    const hotelCount = await this.createQueryBuilder('hotel').select(['COUNT(hotel.id) as count']).addGroupBy('hotel.type').getRawAndEntities();
    return hotelCount;
  }
}