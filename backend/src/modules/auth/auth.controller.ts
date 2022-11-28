import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, signUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: loginDto) {
    return await this.authService.login(dto);
  }

  @Post('signup')
  async signup(@Body() dto: signUpDto) {
    return await this.authService.signup(dto);
  }
}
