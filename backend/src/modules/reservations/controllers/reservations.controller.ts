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
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Roles } from '@modules/auth/decorators/role.decorator';
import { ReservationsService } from '../services/reservations.service';
import {
  createReservationDto,
  updateReservationDto,
} from '../dto/reservation.dto';
// import {
//   createReservationsRoomDto,
//   updateReservationsRoomDto,
// } from '../dto/reservations_room.dto';
import { UserRole } from '@modules/user/user.enum';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { RolesGuard } from '@modules/auth/guards/role.guard';
@Controller('reservations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Resevation')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiBody({ type: createReservationDto })
  @Roles(UserRole.USER, UserRole.RECEPTIONIST)
  async create(@Body() dto: createReservationDto) {
    return await this.reservationsService.create(dto);
  }

  @Get()
  @Roles(UserRole.RECEPTIONIST, UserRole.MANAGER)
  async findAll() {
    return await this.reservationsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.RECEPTIONIST, UserRole.MANAGER)
  @ApiParam({ name: 'id' })
  async findOne(@Param('id') id: string) {
    return await await this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.RECEPTIONIST, UserRole.MANAGER)
  @ApiParam({ name: 'id' })
  async update(@Param('id') id: string, @Body() dto: updateReservationDto) {
    return await this.reservationsService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.RECEPTIONIST, UserRole.MANAGER)
  @ApiParam({ name: 'id' })
  async remove(@Param('id') id: string) {
    return await this.reservationsService.remove(+id);
  }

  // @Post(':id/room')
  // @Roles(UserRole.RECEPTIONIST, UserRole.MANAGER)
  // @ApiParam({ name: 'id' })
  // async createRes(
  //   @Param('id') id: string,
  //   @Body() dto: createReservationsRoomDto,
  // ) {
  //   return await this.reservationsService.createResRoom(+id, dto);
  // }

  // @Get('room/:id')
  // @Roles(UserRole.RECEPTIONIST, UserRole.MANAGER)
  // @ApiParam({ name: 'id' })
  // async findOneRes(@Param('id') id: string) {
  //   return await this.reservationsService.findOneResRoom(+id);
  // }

  // @Patch('room/:id')
  // @Roles(UserRole.RECEPTIONIST, UserRole.MANAGER)
  // @ApiParam({ name: 'id' })
  // async updateRes(
  //   @Param('id') id: string,
  //   @Body() dto: updateReservationsRoomDto,
  // ) {
  //   return await this.reservationsService.updateResRoom(+id, dto);
  // }

  // @Delete('room/:id')
  // @Roles(UserRole.RECEPTIONIST, UserRole.MANAGER)
  // @ApiParam({ name: 'id' })
  // async removeRes(@Param('id') id: string) {
  //   return await this.reservationsService.removeResRoom(+id);
  // }
}
