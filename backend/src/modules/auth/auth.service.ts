import { Injectable } from '@nestjs/common';

import { loginDto, signUpDto } from './dto/auth.dto';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(dto: loginDto) {
    return await this.userService.validateWithEmail(dto.username, dto.password);
  }

  async signup(dto: signUpDto) {
    return await this.userService.create(dto);
  }
}
