import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createHotelRoomDto, updateHotelRoomDto } from '../dto/hotel_room.dto';
import { HotelRoom } from '../entities/hotel_room.entity';

import { HotelService } from './hotel.service';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectRepository(HotelRoom)
    private readonly hotelRoomRepository: Repository<HotelRoom>,
    private readonly hotelService: HotelService,
  ) {}

  private async getHotel(id: number) {
    const checkHotel = await this.hotelService.findOne(id);
    if (!checkHotel) throw new BadRequestException('Invalid hotel id');
    return checkHotel;
  }

  async create(hotelId: number, dto: createHotelRoomDto) {
    const hotel = await this.getHotel(hotelId);
    if (!hotel) {
      throw new BadRequestException('Invalid hotel');
    }

    const newRoom = this.hotelRoomRepository.create({
      ...dto,
      hotel: hotel,
    });

    return await this.hotelRoomRepository.save(newRoom);
  }

  async findAll(hotelId: number, limit = 10, skip = 10) {
    return await this.hotelRoomRepository.find({
      where: { hotelId },
      take: limit,
      skip,
    });
  }

  async findOne(id: number, roomId: number) {
    return await this.hotelRoomRepository.findOne({
      where: { hotelId: id, id: roomId },
    });
  }

  async update(id: number, hotelId: number, dto: updateHotelRoomDto) {
    const checkHotelRoom = await this.hotelRoomRepository.findOne({
      where: { id, hotelId },
    });
    if (!checkHotelRoom) throw new BadRequestException('Invalid Id');

    checkHotelRoom.name = dto.name ?? checkHotelRoom.name;
    checkHotelRoom.description = dto.description ?? checkHotelRoom.description;
    checkHotelRoom.room_number = dto.room_number ?? checkHotelRoom.room_number;
    checkHotelRoom.status = dto.status ?? checkHotelRoom.status;

    return await this.hotelRoomRepository.save(checkHotelRoom);
  }

  async remove(id: number, hotelId: number) {
    const checkExist = await this.hotelRoomRepository.findOne({
      where: { id, hotelId },
    });
    if (!checkExist) {
      throw new BadRequestException('User not exist');
    }
    return await this.hotelRoomRepository.delete({ id });
  }
}
