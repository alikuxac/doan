import {
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { loginDto, signUpDto } from './dto/auth.dto';
import { UserService } from '@modules/user/user.service';
// import { User } from '@modules/user/entities/user.entity';
import { comparePassword } from '@utils/utility';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async login(dto: loginDto) {
    const user = await this.authentication(dto.email, dto.password);
    if (!user) throw new ForbiddenException('Invalid username or password');
    const payload = {
      name: user.fullName,
      email: user.email,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
      user,
    };
  }

  async signup(dto: signUpDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (user) throw new BadRequestException('User already exist');
    return await this.userService.signUp(dto);
  }

  async authentication(username: string, password: string) {
    const user = await this.userService.findOneByEmail(username);
    if (!user) return false;
    const checkPass = comparePassword(password, user.password);
    if (!checkPass) return false;
    return user;
  }
}
