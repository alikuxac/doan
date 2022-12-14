import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { HotelService } from '../services/hotel.service';
import {
  createHotelDto,
  updateHotelDto,
  getAvailableRoomHotelDto,
} from '../dto/hotel.dto';
import { ApiBody, ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { HotelRoomService } from '../services';
import { createHotelRoomDto, updateHotelRoomDto } from '../dto/hotel_room.dto';
import { User as UserDecor } from '@modules/user/decorator/user.decorator';
import { User } from '@modules/user/entities/user.entity';
import { Roles } from '@modules/auth/decorators/role.decorator';
import { UserRole } from '@modules/user/user.enum';
import { RolesGuard } from '@modules/auth/guards/role.guard';

@Controller('hotel')
@ApiTags('hotel')
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: createHotelDto })
  @Roles(UserRole.MASTER_MANAGER)
  @ApiBearerAuth()
  async create(@Body() dto: createHotelDto) {
    return await this.hotelService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.hotelService.findAll();
  }

  @Get('countByType')
  async getCountByType() {
    return await this.hotelService.getCountByType();
  }

  @Get('randomPhoto')
  async getRanomPhoto() {
    return await this.hotelRoomService.getRandomPhotos();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return await this.hotelService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @Roles(UserRole.MANAGER, UserRole.MASTER_MANAGER)
  async update(
    @UserDecor() user: User,
    @Param('id') id: string,
    @Body() dto: updateHotelDto,
  ) {
    return await this.hotelService.update(+id, dto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MASTER_MANAGER)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return await this.hotelService.remove(+id);
  }

  @Get(':id/availableroom')
  @ApiParam({ name: 'id' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAvailableRoom(
    @Param('id') id: string,
    @Query() dto: getAvailableRoomHotelDto,
  ) {
    return await this.hotelRoomService.getAvailableRoom(+id, dto);
  }

  @Get(':hotelId/room')
  @ApiParam({ name: 'hotelId' })
  @ApiBearerAuth()
  async getAllRoom(@Param('hotelId') hotelId: string) {
    return await this.hotelRoomService.findAll(+hotelId);
  }

  @Post('/room')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.MASTER_MANAGER)
  @ApiBearerAuth()
  async createHotelRoom(
    @UserDecor() user: User,
    @Body() dto: createHotelRoomDto,
  ) {
    return await this.hotelRoomService.create(dto, user);
  }

  @Get('/room/:roomId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MANAGER, UserRole.MASTER_MANAGER)
  @ApiBearerAuth()
  async findOneHotelRoom(@Param('roomId') roomId: string) {
    return await this.hotelRoomService.findOne(+roomId);
  }

  @Patch('/room/:roomId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  @Roles(UserRole.MANAGER, UserRole.MASTER_MANAGER)
  @ApiBearerAuth()
  async updateHotelRoom(
    @UserDecor() user: User,
    @Param('id') hotelId: string,
    @Param('roomId') roomId: string,
    @Body() dto: updateHotelRoomDto,
  ) {
    return await this.hotelRoomService.update(+roomId, +hotelId, dto, user);
  }

  @Delete('/room/:roomId')
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MANAGER, UserRole.MASTER_MANAGER)
  @ApiBearerAuth()
  async removeHotelRoom(
    @UserDecor() user: User,
    @Param('id') id: string,
    @Param('roomId') roomId: string,
  ) {
    return await this.hotelRoomService.remove(+roomId, +id, user);
  }
}
