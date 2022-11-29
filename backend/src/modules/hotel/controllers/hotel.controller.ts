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
import { HotelService } from '../services/hotel.service';
import { createHotelDto, updateHotelDto } from '../dto/hotel.dto';
import { ApiBody, ApiTags, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { HotelRoomService } from '../services';
import { createHotelRoomDto, updateHotelRoomDto } from '../dto/hotel_room.dto';

@Controller('hotel')
@UseGuards(JwtAuthGuard)
@ApiTags('hotel')
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

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

  @Get(':id/room')
  @ApiParam({ name: 'hotel id' })
  async getAllRoom(@Param('id') hotelId: string) {
    return await this.hotelRoomService.findAll(+hotelId);
  }

  @Post(':id/room')
  @ApiParam({ name: 'hotel id' })
  async createHotelRoom(
    @Param('id') hotelId: string,
    @Body() dto: createHotelRoomDto,
  ) {
    return await this.hotelRoomService.create(+hotelId, dto);
  }

  @Get(':id/room/:roomId')
  @ApiParam({ name: 'id' })
  async findOneHotelRoom(
    @Param('id') hotelId: string,
    @Param('roomId') roomId: string,
  ) {
    return await this.hotelRoomService.findOne(+hotelId, +roomId);
  }

  @Patch(':id/room/:roomId')
  @ApiParam({ name: 'id' })
  async updateHotelRoom(
    @Param('id') hotelId: string,
    @Param('roomId') roomId: string,
    @Body() dto: updateHotelRoomDto,
  ) {
    return await this.hotelRoomService.update(+roomId, +hotelId, dto);
  }

  @Delete(':id/room/:roomId')
  @ApiParam({ name: 'id' })
  async removeHotelRoom(
    @Param('id') id: string,
    @Param('roomId') roomId: string,
  ) {
    return await this.hotelRoomService.remove(+roomId, +id);
  }
}
