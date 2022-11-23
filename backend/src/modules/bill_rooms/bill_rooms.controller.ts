import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillRoomsService } from './bill_rooms.service';
import { CreateBillRoomDto } from './dto/create-bill_room.dto';
import { UpdateBillRoomDto } from './dto/update-bill_room.dto';

@Controller('bill-rooms')
export class BillRoomsController {
  constructor(private readonly billRoomsService: BillRoomsService) {}

  @Post()
  create(@Body() createBillRoomDto: CreateBillRoomDto) {
    return this.billRoomsService.create(createBillRoomDto);
  }

  @Get()
  findAll() {
    return this.billRoomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billRoomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillRoomDto: UpdateBillRoomDto) {
    return this.billRoomsService.update(+id, updateBillRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billRoomsService.remove(+id);
  }
}
