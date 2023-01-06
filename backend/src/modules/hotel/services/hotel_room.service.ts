import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';

import {
  createHotelRoomDto,
  updateHotelRoomDto,
  updateHotelRoomNumberDto,
} from '../dto/hotel_room.dto';
// import { HotelRoom } from '../entities/hotel_room.entity';

import { HotelService } from './hotel.service';
import { User } from '@modules/user/entities/user.entity';
import { UserRole } from '@modules/user/user.enum';
import { HotelRoomRepository } from '../repository/hotel_room.repository';
import { getAvailableRoomHotelDto } from '../dto/hotel.dto';
@Injectable()
export class HotelRoomService {
  constructor(
    // @InjectRepository(HotelRoom)
    private readonly hotelRoomRepository: HotelRoomRepository,
    private readonly hotelService: HotelService,
  ) {}

  private async getHotel(id: number) {
    const checkHotel = await this.hotelService.findOne(id);
    if (!checkHotel) throw new BadRequestException('Invalid hotel id');
    return checkHotel;
  }

  async create(dto: createHotelRoomDto, user: User) {
    const hotel = await this.getHotel(dto.hotelId);
    if (!hotel) {
      throw new BadRequestException('Invalid hotel');
    }
    if (
      user.role.includes(UserRole.MANAGER) &&
      !user.admins.find((hotel) => {
        return hotel.id === dto.hotelId;
      })
    ) {
      throw new BadRequestException('You dont have permission to create room');
    }

    delete dto.hotelId;

    const newRoom = this.hotelRoomRepository.create({
      ...dto,
      hotel: hotel,
    });

    return await this.hotelRoomRepository.save(newRoom);
  }

  async findAll(hotelId: number) {
    return await this.hotelRoomRepository.find({
      where: { hotelId },
    });
  }

  async findOne(id: number) {
    return await this.hotelRoomRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    hotelId: number,
    dto: updateHotelRoomDto,
    user: User,
  ) {
    if (
      (user.role.includes(UserRole.MANAGER) &&
        !user.admins.find((hotel) => {
          return hotel.id === hotelId;
        })) ||
      (user.role.includes(UserRole.USER) && !user.isAdmin)
    ) {
      throw new BadRequestException(
        'You dont have permission to update this room',
      );
    }
    const checkHotelRoom = await this.hotelRoomRepository.findOne({
      where: { id, hotelId },
    });
    if (!checkHotelRoom) throw new BadRequestException('Invalid Id');

    checkHotelRoom.name = dto.name ?? checkHotelRoom.name;
    checkHotelRoom.description = dto.description ?? checkHotelRoom.description;
    checkHotelRoom.price = dto.price ?? checkHotelRoom.price;
    checkHotelRoom.type = dto.type ?? checkHotelRoom.type;
    checkHotelRoom.maxOccupancy =
      dto.maxOccupancy ?? checkHotelRoom.maxOccupancy;
    checkHotelRoom.photo = dto.photo ?? checkHotelRoom.photo;

    return await this.hotelRoomRepository.save(checkHotelRoom);
  }

  async remove(id: number, hotelId: number, user: User) {
    const checkExist = await this.hotelRoomRepository.findOne({
      where: { id, hotelId },
    });
    if (!checkExist) {
      throw new BadRequestException('Room not exist');
    }
    if (
      user.role.includes(UserRole.MANAGER) &&
      !user.admins.find((hotel) => {
        return hotel.id === checkExist.hotelId;
      })
    ) {
      throw new BadRequestException(
        'You dont have permission to delete this room',
      );
    }

    return await this.hotelRoomRepository.delete({ id });
  }

  async updateHotelNumber(
    id: number,
    dto: updateHotelRoomNumberDto,
    user: User,
  ) {
    if (
      (user.role.includes(UserRole.MANAGER) &&
        !user.admins.find((hotel) => {
          return hotel.id === dto.hotelId;
        })) ||
      (user.role.includes(UserRole.USER) && !user.isAdmin)
    ) {
      throw new BadRequestException(
        'You dont have permission to update this room',
      );
    }
    const checkHotelRoom = await this.findOne(id);
    switch (dto.action) {
      case 'inc':
        const checkRoomNumberExist =
          await this.hotelRoomRepository.checkRoomNumberExist(
            dto.roomNumber,
            dto.hotelId,
          );
        if (!checkRoomNumberExist) {
          throw new BadRequestException('Room number in this hotel exist');
        }
        checkHotelRoom.roomNumber = checkHotelRoom.roomNumber.concat(
          dto.roomNumber,
        );
        return this.hotelRoomRepository.save(checkHotelRoom);
      case 'dec':
        checkHotelRoom.roomNumber = checkHotelRoom.roomNumber.filter((room) => {
          return dto.roomNumber.includes(room);
        });
        return this.hotelRoomRepository.save(checkHotelRoom);
      default:
        break;
    }
  }

  async getAvailableRoom(id: number, dto: getAvailableRoomHotelDto) {
    const checkExist = await this.hotelService.findOne(id);
    if (!checkExist) {
      throw new BadRequestException('Invalid hotel Id');
    }
    const { rooms, count } = await this.hotelRoomRepository.getAvailableRoom(
      id,
      dto.checkIn,
      dto.checkOut,
    );
    return { rooms, count };
  }

  async getRandomPhotos() {
    return await this.hotelRoomRepository.selectRandomPhotos();
  }
}
