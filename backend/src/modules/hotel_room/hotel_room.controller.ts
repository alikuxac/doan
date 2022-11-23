import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelRoomService } from './hotel_room.service';
import { CreateHotelRoomDto } from './dto/create-hotel_room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel_room.dto';

@Controller('hotel-room')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post()
  create(@Body() createHotelRoomDto: CreateHotelRoomDto) {
    return this.hotelRoomService.create(createHotelRoomDto);
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
  update(
    @Param('id') id: string,
    @Body() updateHotelRoomDto: UpdateHotelRoomDto,
  ) {
    return this.hotelRoomService.update(+id, updateHotelRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelRoomService.remove(+id);
  }
}
