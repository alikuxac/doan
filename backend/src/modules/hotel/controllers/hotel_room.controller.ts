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
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('hotel/room')
@ApiTags('Hotel Room')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post()
  @ApiBody({ type: createHotelRoomDto })
  async create(@Body() dto: createHotelRoomDto) {
    return await this.hotelRoomService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.hotelRoomService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async findOne(@Param('id') id: string) {
    return await this.hotelRoomService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id: string, @Body() dto: updateHotelRoomDto) {
    return await this.hotelRoomService.update(+id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async remove(@Param('id') id: string) {
    return await this.hotelRoomService.remove(+id);
  }
}
