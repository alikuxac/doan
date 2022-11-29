import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from '../services/reservations.service';
import {
  createReservationDto,
  updateReservationDto,
} from '../dto/reservation.dto';
import {
  createReservationsRoomDto,
  updateReservationsRoomDto,
} from '../dto/reservations_room.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(@Body() dto: createReservationDto) {
    return await this.reservationsService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.reservationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await await this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: updateReservationDto) {
    return await this.reservationsService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reservationsService.remove(+id);
  }

  @Post(':id/room')
  async createRes(
    @Param('id') id: string,
    @Body() dto: createReservationsRoomDto,
  ) {
    return await this.reservationsService.createResRoom(+id, dto);
  }

  @Get('room/:id')
  async findOneRes(@Param('id') id: string) {
    return await this.reservationsService.findOneResRoom(+id);
  }

  @Patch('room/:id')
  async updateRes(
    @Param('id') id: string,
    @Body() dto: updateReservationsRoomDto,
  ) {
    return await this.reservationsService.updateResRoom(+id, dto);
  }

  @Delete('room/:id')
  async removeRes(@Param('id') id: string) {
    return await this.reservationsService.removeResRoom(+id);
  }
}
