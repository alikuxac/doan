import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  createHotelRoomTypeDto,
  updateHotelRoomTypeDto,
} from '../dto/hote_room_type.dto';
import { HotelRoomType } from '../entities/hotel_room_type.entity';

@Injectable()
export class HotelRoomTypeService {
  constructor(
    @InjectRepository(HotelRoomType)
    private readonly hotelRoomTypeRepository: Repository<HotelRoomType>,
  ) {}

  async create(dto: createHotelRoomTypeDto) {
    const checkExist = await this.hotelRoomTypeRepository.findOne({
      where: { name: dto.name },
    });
    if (checkExist) {
      throw new ConflictException('This name exist');
    }
    const newRoomType = this.hotelRoomTypeRepository.create(dto);
    return await this.hotelRoomTypeRepository.save(newRoomType);
  }

  async findAll(limit = 10, skip = 10) {
    return await this.hotelRoomTypeRepository.find({ take: limit, skip });
  }

  async findOne(id: number) {
    return await this.hotelRoomTypeRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: updateHotelRoomTypeDto) {
    const checkExist = await this.hotelRoomTypeRepository.findOne({
      where: { id },
    });
    if (!checkExist) throw new ConflictException('Invalid id');

    checkExist.name = dto.name ?? checkExist.name;
    checkExist.description = dto.description ?? checkExist.description;
    checkExist.bed = dto.bed ?? checkExist.bed;
    checkExist.extra_bed = dto.extra_bed ?? checkExist.extra_bed;
    checkExist.max_people = dto.max_people ?? checkExist.max_people;

    return await this.hotelRoomTypeRepository.save(checkExist);
  }

  async delete(id: number) {
    const checkExist = await this.hotelRoomTypeRepository.findOne({
      where: { id },
    });
    if (!checkExist) {
      throw new ConflictException('Invalid id');
    }
    return await this.hotelRoomTypeRepository.delete(id);
  }
}
