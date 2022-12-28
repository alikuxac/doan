import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createHotelRoomDto, updateHotelRoomDto } from '../dto/hotel_room.dto';
import { HotelRoom } from '../entities/hotel_room.entity';

import { HotelService } from './hotel.service';
import { User } from '@modules/user/entities/user.entity';
import { UserRole } from '@modules/user/user.enum';

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

  async create(hotelId: number, dto: createHotelRoomDto, user: User) {
    const hotel = await this.getHotel(hotelId);
    if (!hotel) {
      throw new BadRequestException('Invalid hotel');
    }
    if (
      user.role === UserRole.MANAGER &&
      !user.admins.find((hotel) => {
        return hotel.id === hotelId;
      })
    ) {
      throw new BadRequestException('You dont have permission to create room');
    }

    const newRoom = this.hotelRoomRepository.create({
      ...dto,
      hotel: hotel,
    });

    return await this.hotelRoomRepository.save(newRoom);
  }

  async findAll(hotelId: number, user: User, limit = 10, skip = 10) {
    if (
      user.role === UserRole.MANAGER &&
      !user.admins.find((hotel) => {
        return hotel.id === hotelId;
      })
    ) {
      throw new BadRequestException('You dont have permission to find rooms');
    }
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

  async update(
    id: number,
    hotelId: number,
    dto: updateHotelRoomDto,
    user: User,
  ) {
    if (
      user.role === UserRole.MANAGER &&
      !user.admins.find((hotel) => {
        return hotel.id === hotelId;
      })
    ) {
      throw new BadRequestException(
        'You dont have permission to delete this room',
      );
    }
    const checkHotelRoom = await this.hotelRoomRepository.findOne({
      where: { id, hotelId },
    });
    if (!checkHotelRoom) throw new BadRequestException('Invalid Id');

    checkHotelRoom.name = dto.name ?? checkHotelRoom.name;
    checkHotelRoom.description = dto.description ?? checkHotelRoom.description;
    // checkHotelRoom.room_number = [dto.roomNumber] ?? checkHotelRoom.room_number;
    // checkHotelRoom.status = dto.status ?? checkHotelRoom.status;

    return await this.hotelRoomRepository.save(checkHotelRoom);
  }

  async remove(id: number, hotelId: number, user: User) {
    if (
      user.role === UserRole.MANAGER &&
      !user.admins.find((hotel) => {
        return hotel.id === hotelId;
      })
    ) {
      throw new BadRequestException(
        'You dont have permission to delete this room',
      );
    }
    const checkExist = await this.hotelRoomRepository.findOne({
      where: { id, hotelId },
    });
    if (!checkExist) {
      throw new BadRequestException('User not exist');
    }
    return await this.hotelRoomRepository.delete({ id });
  }
}
