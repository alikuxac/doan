import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { signUpDto } from './dto/auth.dto';
import { UserService } from '@modules/user/user.service';
import { User } from '@modules/user/entities/user.entity';
import { comparePassword } from '@utils/utility';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User) {
    const payload = {
      name: user.firstName,
      email: user.email,
      id: user.id,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async signup(dto: signUpDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (user) throw new BadRequestException('User already exist');
    return await this.userService.create(dto);
  }

  async authentication(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    const checkPass = comparePassword(password, user.password);
    if (!user || !checkPass) return false;
    return user;
  }
}
