import { Injectable, BadRequestException } from '@nestjs/common';
import { createHotelDto, updateHotelDto } from '../dto/hotel.dto';
import { User } from '@modules/user/entities/user.entity';
import { UserRole } from '@modules/user/user.enum';
import { HotelRepository } from '../repository/hotel.repository';

@Injectable()
export class HotelService {
  constructor(private readonly hotelRepository: HotelRepository) {}

  public getHotelRepository() {
    return this.hotelRepository;
  }

  async create(dto: createHotelDto) {
    const checkExist = await this.hotelRepository.findOne({
      where: [{ name: dto.name }, { address: dto.address }],
    });
    if (checkExist) {
      throw new BadRequestException('Hotel exist');
    }
    const newHotel = this.hotelRepository.create({
      name: dto.name,
      description: dto.description,
      address: dto.address,
      country: dto.country,
      type: dto.type,
    });
    return await this.hotelRepository.save(newHotel);
  }

  async findAll() {
    const hotels = await this.hotelRepository.find({
      relations: ['rooms'],
    });
    return { hotels };
  }

  async findOne(id: number) {
    const exist = await this.hotelRepository.findOne({
      where: { id },
      relations: { rooms: true },
    });
    if (!exist) {
      throw new BadRequestException('Hotel not found');
    }
    return exist;
  }

  async update(id: number, dto: updateHotelDto, user: User) {
    if (
      user.role.includes(UserRole.MANAGER) &&
      !user.admins.find((hotel) => hotel.id === id)
    ) {
      throw new BadRequestException('You dont have permission to do this.');
    }
    const checkExist = await this.hotelRepository.findOne({ where: { id } });
    if (!checkExist) {
      throw new BadRequestException('Hotel not exist');
    }
    return await this.hotelRepository.update(id, {
      name: dto.name ?? checkExist.name,
      address: dto.address ?? checkExist.address,
      description: dto.description ?? checkExist.description,
      country: dto.country ?? checkExist.country,
    });
  }

  async remove(id: number) {
    const checkExist = await this.hotelRepository.findOne({
      where: { id },
      relations: ['rooms'],
    });
    if (!checkExist) {
      throw new BadRequestException('User not exist');
    }
    if (checkExist.rooms.length > 0) {
      throw new BadRequestException(
        `You cannot delete this hotel because of room length`,
      );
    }
    return await this.hotelRepository.delete({ id });
  }

  async getCountByType() {
    return await this.hotelRepository.countByType();
  }
}
