import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  createStaffDto,
  updateStaffDto,
  changeHotelDto,
} from './dto/staff.dto';

import { Staff } from './entities/staff.entity';
import { Hotel } from '@modules/hotel/entities/hotel.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async create(dto: createStaffDto) {
    const checkHotelExist = await this.hotelRepository.findOne({
      where: { id: dto.hotelId },
    });
    if (!checkHotelExist) {
      throw new ConflictException('This hotel does not exist');
    }
    delete dto.hotelId;
    const newStaff = this.staffRepository.create({
      ...dto,
      hotel: checkHotelExist,
    });
    return await this.staffRepository.save(newStaff);
  }

  async findAll() {
    return await this.staffRepository.find({ relations: ['staff_roles'] });
  }

  async findOne(id: number) {
    return await this.staffRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: updateStaffDto) {
    const checkExist = await this.staffRepository.findOne({
      where: { id },
    });
    if (!checkExist) {
      throw new ConflictException('This role does not exist');
    }
    return await this.staffRepository.update(id, {
      startDate: dto.startDate ?? checkExist.startDate,
    });
  }

  async remove(id: number) {
    const checkExist = await this.staffRepository.findOne({ where: { id } });
    if (!checkExist) {
      throw new ConflictException('Staff does not exist');
    }
    return await this.staffRepository.delete(id);
  }

  async changeHotel(id: number, dto: changeHotelDto) {
    const checkExist = await this.staffRepository.findOne({ where: { id } });
    if (!checkExist) {
      throw new ConflictException('Staff does not exist');
    }
    const checkHotelExist = await this.hotelRepository.findOne({
      where: { id: dto.hotelId },
    });
    if (!checkHotelExist) {
      throw new ConflictException('This role does not exist');
    }
    checkExist.hotel = checkHotelExist;

    return await this.staffRepository.save(checkExist);
  }
}
