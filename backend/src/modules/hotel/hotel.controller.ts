import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { createHotelDto, updateHotelDto } from './dto/hotel.dto';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  create(@Body() dto: createHotelDto) {
    return this.hotelService.create(dto);
  }

  @Get()
  findAll() {
    return this.hotelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: updateHotelDto) {
    return this.hotelService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
}
