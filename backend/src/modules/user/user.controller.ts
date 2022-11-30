import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { RolesGuard } from '@modules/auth/guards/role.guard';

import { UserService } from './user.service';
import {
  assignRoleDto,
  changeHotelDto,
  createUserDto,
  updateUserDto,
} from './dto/user.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Roles } from '@modules/auth/decorators/role.decorator';
import { UserRole } from './user.enum';

@Controller('user')
@ApiTags('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: createUserDto })
  @Roles(UserRole.MANAGER, UserRole.RECEPTIONIST)
  async create(@Body() dto: createUserDto) {
    return await this.userService.create(dto);
  }

  @Get()
  @Roles(UserRole.MANAGER, UserRole.RECEPTIONIST)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MANAGER, UserRole.RECEPTIONIST)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.USER, UserRole.MANAGER, UserRole.RECEPTIONIST)
  async update(@Param('id') id: string, @Body() dto: updateUserDto) {
    return await this.userService.update(+id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MANAGER, UserRole.RECEPTIONIST)
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  @Patch(':id/role')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MANAGER, UserRole.MASTER_MANAGER)
  async changeRole(@Param('id') id: string, @Body() dto: assignRoleDto) {
    return await this.userService.changeRole(+id, dto);
  }

  @Patch(':id/hotel')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MASTER_MANAGER)
  async changeHotel(@Param('id') id: string, @Body() dto: changeHotelDto) {
    return await this.userService.changeHotel(+id, dto);
  }

  @Get(':id/reservations')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.USER)
  async getReservations(@Param('id') id: string) {
    return await this.userService.getReservationOfUser(+id);
  }
}
