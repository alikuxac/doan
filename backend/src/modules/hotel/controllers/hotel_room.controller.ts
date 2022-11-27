import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelRoomService } from '../services/hotel_room.service';
import { createHotelRoomDto, updateHotelRoomDto } from '../dto/hotel_room.dto';
@Controller('hotel/room')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post()
  create(@Body() dto: createHotelRoomDto) {
    return this.hotelRoomService.create(dto);
  }

  @Get()
  findAll() {
    return this.hotelRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelRoomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: updateHotelRoomDto) {
    return this.hotelRoomService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelRoomService.remove(+id);
  }
}
