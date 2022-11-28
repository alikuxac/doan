import {
  Injectable,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

import {
  createUserDto,
  updateUserDto,
  assignRoleDto,
  changeHotelDto,
} from './dto/user.dto';

import { comparePassword } from '@utils/utility';
import { HotelService } from '@modules/hotel/services';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hotelService: HotelService,
  ) {}

  async getTotalUsers() {
    return await this.userRepository.count();
  }

  async create(dto: createUserDto) {
    const checkExist = await this.userRepository.findOne({
      where: [
        { email: dto.email },
        { username: dto.username },
        { phone: dto.phone ?? null },
      ],
    });
    if (checkExist)
      throw new ConflictException('User with email or username exist');
    const hotel = dto.hotelId
      ? await this.hotelService.findOne(dto.hotelId)
      : null;
    const newUser = this.userRepository.create({
      username: dto.username,
      phone: dto.phone,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: dto.password,
      hotel,
    });
    return await this.userRepository.save(newUser);
  }

  async findAll(limit = 10, skip = 0) {
    return await this.userRepository.find({ skip, take: limit });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: number, dto: updateUserDto) {
    const checkExist = await this.userRepository.findOneBy({ id });
    if (!checkExist) {
      throw new ConflictException('User does not exist');
    }
    return await this.userRepository.update(
      { id },
      {
        email: dto.email ?? checkExist.email,
        phone: dto.phone ?? checkExist.phone,
        firstName: dto.firstName ?? checkExist.firstName,
        lastName: dto.lastName ?? checkExist.lastName,
      },
    );
  }

  async remove(id: number) {
    const checkExist = await this.userRepository.findOneBy({ id });
    if (!checkExist) {
      throw new ConflictException('User with id does not exist');
    }
    return await this.userRepository.delete({ id: id });
  }

  async changeRole(id: number, dto: assignRoleDto) {
    const checkExist = await this.userRepository.findOneBy({ id });
    if (!checkExist) {
      throw new ConflictException('User with id does not exist');
    }
    return await this.userRepository.update(id, { role: dto.role });
  }

  async validateWithEmail(email: string, password: string) {
    const checkExist = await this.userRepository.findOneBy({ email });
    if (!checkExist) {
      throw new ConflictException('User with username does not exist');
    }
    if (!comparePassword(password, checkExist.password)) {
      throw new ForbiddenException('Wrong password');
    }
    return checkExist;
  }

  async changeHotel(id: number, dto: changeHotelDto) {
    const checkExist = await this.userRepository.findOne({
      where: { id },
    });
    if (!checkExist) {
      throw new ConflictException('User does not exist');
    }
    const checkHotelExist = await this.hotelService.findOne(dto.hotelId);
    if (!checkHotelExist) {
      throw new ConflictException('This hotel does not exist');
    }
    checkExist.hotel = checkHotelExist;

    return await this.userRepository.save(checkExist);
  }
}
