import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Hotel } from '../entities/hotel.entity';
import { createHotelDto, updateHotelDto } from '../dto/hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  public getHotelRepository() {
    return this.hotelRepository;
  }

  async create(dto: createHotelDto) {
    const checkExist = await this.hotelRepository.findOne({
      where: [
        { taxcode: dto.taxcode },
        { name: dto.name },
        { address: dto.address },
      ],
    });
    if (checkExist) {
      throw new ConflictException('Hotel exist');
    }
    const newHotel = this.hotelRepository.create({
      name: dto.name,
      taxcode: dto.taxcode,
      description: dto.description,
      address: dto.address,
      country: dto.country,
    });
    return await this.hotelRepository.save(newHotel);
  }

  async findAll(limit = 10, skip = 10) {
    const hotels = await this.hotelRepository.find({
      take: limit,
      skip,
    });
    return { hotels };
  }

  async findOne(id: number) {
    const exist = await this.hotelRepository.findOne({ where: { id } });
    if (!exist) {
      throw new ConflictException('User not found');
    }
    return exist;
  }

  async update(id: number, dto: updateHotelDto) {
    const checkExist = await this.hotelRepository.findOne({ where: { id } });
    if (!checkExist) {
      throw new ConflictException('User not exist');
    }
    return await this.hotelRepository.update(id, {
      name: dto.name ?? checkExist.name,
      taxcode: dto.taxcode ?? checkExist.taxcode,
      address: dto.address ?? checkExist.address,
      description: dto.description ?? checkExist.description,
      country: dto.country ?? checkExist.country,
    });
  }

  async remove(id: number) {
    const checkExist = await this.hotelRepository.findOne({ where: { id } });
    if (!checkExist) {
      throw new ConflictException('User not exist');
    }
    return await this.hotelRepository.delete({ id });
  }
}
