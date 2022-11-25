import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createHotelRoomDto, updateHotelRoomDto } from '../dto/hotel_room.dto';
import { HotelRoom } from '../entities/hotel_room.entity';

import { HotelService } from './hotel.service';
import { HotelRoomTypeService } from './hotel_room_type.service';

@Injectable()
export class HotelRoomService {
  constructor(
    @InjectRepository(HotelRoom)
    private readonly hotelRoomRepository: Repository<HotelRoom>,
    private readonly hotelService: HotelService,
    private readonly hotelRoomTypeService: HotelRoomTypeService,
  ) {}

  private async getHotel(id: number) {
    const checkHotel = await this.hotelService.findOne(id);
    if (!checkHotel) throw new ConflictException('Invalid hotel id');
    return checkHotel;
  }

  private async getType(id: number) {
    const checkType = await this.hotelRoomTypeService.findOne(id);
    if (!checkType) throw new ConflictException('Invalid type id');
    return checkType;
  }

  async create(dto: createHotelRoomDto) {
    const hotel = await this.getHotel(dto.hotelId);
    const type = await this.getType(dto.roomTypeId);

    const newRoom = this.hotelRoomRepository.create({
      ...dto,
      type,
    });
    hotel.rooms.push(newRoom);

    return await this.hotelService.getHotelRepository().save(hotel);
  }

  async findAll(limit = 10, skip = 10) {
    return await this.hotelRoomRepository.find({ take: limit, skip });
  }

  async findOne(id: number) {
    return await this.hotelRoomRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: updateHotelRoomDto) {
    const checkHotelRoom = await this.hotelRoomRepository.findOne({
      where: { id },
    });
    if (!checkHotelRoom) throw new ConflictException('Invalid Id');

    checkHotelRoom.name = dto.name ?? checkHotelRoom.name;
    checkHotelRoom.description = dto.description ?? checkHotelRoom.description;
    checkHotelRoom.room_number = dto.room_number ?? checkHotelRoom.room_number;
  }

  async remove(id: number) {
    const checkExist = await this.hotelRoomRepository.findOne({
      where: { id },
    });
    if (!checkExist) {
      throw new ConflictException('User not exist');
    }
    return await this.hotelRoomRepository.delete({ id });
  }
}
