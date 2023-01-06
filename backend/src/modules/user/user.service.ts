import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
import { UserRole } from './user.enum';
import { signUpDto } from '@modules/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hotelService: HotelService,
    private readonly configService: ConfigService,
  ) {}

  async init() {
    const usename = this.configService.get<string>('ADMIN_EMAIL');
    const user = await this.findOneByEmail(usename);
    if (user) {
      if (!user.isAdmin) {
        user.isAdmin = true;
        return await this.userRepository.save(user);
      }
      return;
    } else {
      const newUser = this.userRepository.create({
        email: this.configService.get<string>('ADMIN_EMAIL'),
        password: this.configService.get<string>('ADMIN_PASSWORD'),
        fullName: 'admin',
        isAdmin: true,
        role: [UserRole.MASTER_MANAGER],
      });
      return await this.userRepository.save(newUser);
    }
  }

  async getTotalUsers() {
    return await this.userRepository.count();
  }

  async create(dto: createUserDto) {
    const checkExist = await this.userRepository.findOne({
      where: [{ email: dto.email }],
    });
    if (checkExist)
      throw new BadRequestException('User with email or username exist');
    const hotel = dto.hotelId
      ? await this.hotelService.findOne(dto.hotelId)
      : null;
    const newUser = this.userRepository.create({
      phone: dto.phone,
      email: dto.email,
      fullName: dto.fullName,
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

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getReservationOfUser(id: number) {
    const checkExist = await this.userRepository.findOneBy({ id });
    if (!checkExist) {
      throw new BadRequestException('User does not exist');
    }
    const query = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.reservations', 'reservations')
      .innerJoin('reservations.rooms', 'reservationroom')
      .where('user.id = :id', { id })
      .getMany();
    return query.map((value) => {
      return { reservation: value.reservations };
    });
  }

  async update(id: number, dto: updateUserDto) {
    const checkExist = await this.userRepository.findOneBy({ id });
    if (!checkExist) {
      throw new BadRequestException('User does not exist');
    }
    return await this.userRepository.update(
      { id },
      {
        email: dto.email ?? checkExist.email,
        phone: dto.phone ?? checkExist.phone,
        fullName: dto.fullName ?? checkExist.fullName,
      },
    );
  }

  async remove(id: number) {
    const checkExist = await this.userRepository.findOneBy({ id });
    if (!checkExist) {
      throw new BadRequestException('User with id does not exist');
    }
    return await this.userRepository.delete({ id: id });
  }

  async changeRole(id: number, dto: assignRoleDto) {
    const checkExist = await this.userRepository.findOneBy({ id });
    if (!checkExist) {
      throw new BadRequestException('User with id does not exist');
    }
    return await this.userRepository.update(id, { role: dto.role });
  }

  async validateWithEmail(email: string, password: string) {
    const checkExist = await this.userRepository.findOneBy({ email });
    if (!checkExist) {
      throw new BadRequestException('User with username does not exist');
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
      throw new BadRequestException('User does not exist');
    }
    const checkHotelExist = await this.hotelService.findOne(dto.hotelId);
    if (!checkHotelExist) {
      throw new BadRequestException('This hotel does not exist');
    }
    checkExist.hotel = checkHotelExist;

    return await this.userRepository.save(checkExist);
  }

  async signUp(dto: signUpDto) {
    const { email, fullname, password, phone } = dto;
    const checkExist = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!checkExist) {
      throw new BadRequestException('Email already exist');
    }
    const newUser = this.userRepository.create();
    newUser.email = email;
    newUser.fullName = fullname;
    newUser.password = password;
    newUser.role = [UserRole.USER];
    newUser.phone = phone;
    return this.userRepository.save(newUser);
  }
}
