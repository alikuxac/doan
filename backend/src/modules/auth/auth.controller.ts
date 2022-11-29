import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBasicAuth, ApiBody, ApiTags } from '@nestjs/swagger';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBasicAuth()
  async login(@Request() request) {
    return await this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() request) {
    return request.logout();
  }

  @Post('signup')
  @ApiBody({ type: signUpDto })
  async signup(@Body() dto: signUpDto) {
    return await this.authService.signup(dto);
  }
}
