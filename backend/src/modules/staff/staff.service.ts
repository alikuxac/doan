import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  createStaffDto,
  updateStaffDto,
  assignRoleStaffDto,
  changeHotelDto,
} from './dto/staff.dto';
import { createStaffRoleDto, updateStaffRoleDto } from './dto/staff_role.dto';

import { Staff } from './entities/staff.entity';
import { StaffRole } from './entities/staff_role.entity';
import { Hotel } from '@modules/hotel/entities/hotel.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(StaffRole)
    private readonly staffRoleRepository: Repository<StaffRole>,
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async init() {
    let staffRole = await this.staffRoleRepository.findOne({
      where: { name: 'user' },
    });
    if (!staffRole) {
      staffRole = await this.staffRoleRepository.create({ name: 'user' });
    }
    await this.staffRoleRepository.save(staffRole);
  }

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

  async assignRole(id: number, dto: assignRoleStaffDto) {
    const checkExist = await this.staffRepository.findOne({ where: { id } });
    if (!checkExist) {
      throw new ConflictException('Staff does not exist');
    }
    const checkRoleExist = await this.staffRoleRepository.findOne({
      where: { id: dto.roleId },
    });
    if (!checkRoleExist) {
      throw new ConflictException('This role does not exist');
    }
    checkExist.role = checkRoleExist;

    return await this.staffRepository.save(checkExist);
  }

  async createStaffRole(dto: createStaffRoleDto) {
    const checkExist = await this.staffRoleRepository.findOne({
      where: { name: dto.name },
    });
    if (checkExist) {
      throw new ConflictException('This role exist');
    }
    const newStaffRole = this.staffRoleRepository.create({
      name: dto.name,
      description: dto.description,
      position: dto.position,
    });
    return await this.staffRoleRepository.save(newStaffRole);
  }

  async findAllStaffRole() {
    return await this.staffRoleRepository.find();
  }

  async findOneStaffRole(id: number) {
    return await this.staffRoleRepository.findOne({ where: { id } });
  }

  async updateStaffRole(id: number, dto: updateStaffRoleDto) {
    const checkExist = await this.staffRoleRepository.findOne({
      where: { id },
    });
    if (!checkExist) {
      throw new ConflictException('This role does not exist');
    }
    return await this.staffRoleRepository.update(id, {
      name: dto.name ?? checkExist.name,
      position: dto.position ?? checkExist.position,
      description: dto.description ?? checkExist.description,
    });
  }

  async removeStaffRole(id: number) {
    const checkExist = await this.staffRoleRepository.findOne({
      where: { id },
    });
    if (!checkExist) {
      throw new ConflictException('This role does not exist');
    }
    return await this.staffRoleRepository.delete(id);
  }
}
