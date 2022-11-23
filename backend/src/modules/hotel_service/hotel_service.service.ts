import { Injectable } from '@nestjs/common';
import { CreateHotelServiceDto } from './dto/create-hotel_service.dto';
import { UpdateHotelServiceDto } from './dto/update-hotel_service.dto';

@Injectable()
export class HotelServiceService {
  create(createHotelServiceDto: CreateHotelServiceDto) {
    return 'This action adds a new hotelService';
  }

  findAll() {
    return `This action returns all hotelService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelService`;
  }

  update(id: number, updateHotelServiceDto: UpdateHotelServiceDto) {
    return `This action updates a #${id} hotelService`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelService`;
  }
}
