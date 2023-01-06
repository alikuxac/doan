import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '@modules/auth/guards/role.guard';
import { User as UserDecor } from './decorator/user.decorator';
import { User } from './entities/user.entity';
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
@ApiBearerAuth()
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

  @Get('reservations')
  @Roles(UserRole.USER)
  async getReservations(@UserDecor() user: User) {
    return await this.userService.getReservationOfUser(user.id);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MANAGER, UserRole.RECEPTIONIST)
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.USER, UserRole.MANAGER, UserRole.RECEPTIONIST)
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: updateUserDto,
  ) {
    return await this.userService.update(+id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MANAGER, UserRole.MASTER_MANAGER)
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.userService.remove(+id);
  }

  @Patch(':id/role')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MANAGER, UserRole.MASTER_MANAGER)
  async changeRole(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: assignRoleDto,
  ) {
    return await this.userService.changeRole(+id, dto);
  }

  @Patch(':id/hotel')
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MASTER_MANAGER)
  async changeHotel(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: changeHotelDto,
  ) {
    return await this.userService.changeHotel(+id, dto);
  }
}
