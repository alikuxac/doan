import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsRoomService } from './reservations_room.service';
import { CreateReservationsRoomDto } from './dto/create-reservations_room.dto';
import { UpdateReservationsRoomDto } from './dto/update-reservations_room.dto';

@Controller('reservations-room')
export class ReservationsRoomController {
  constructor(
    private readonly reservationsRoomService: ReservationsRoomService,
  ) {}

  @Post()
  create(@Body() createReservationsRoomDto: CreateReservationsRoomDto) {
    return this.reservationsRoomService.create(createReservationsRoomDto);
  }

  @Get()
  findAll() {
    return this.reservationsRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsRoomService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationsRoomDto: UpdateReservationsRoomDto,
  ) {
    return this.reservationsRoomService.update(+id, updateReservationsRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsRoomService.remove(+id);
  }
}
