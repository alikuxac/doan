import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelService } from '../services/hotel.service';
import { createHotelDto, updateHotelDto } from '../dto/hotel.dto';
import { ApiBody, ApiTags, ApiParam } from '@nestjs/swagger';

@Controller('hotel')
@ApiTags('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @ApiBody({ type: createHotelDto })
  async create(@Body() dto: createHotelDto) {
    return await this.hotelService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.hotelService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async findOne(@Param('id') id: string) {
    return await this.hotelService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id: string, @Body() dto: updateHotelDto) {
    return await this.hotelService.update(+id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async remove(@Param('id') id: string) {
    return await this.hotelService.remove(+id);
  }
}
