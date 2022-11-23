import { Injectable } from '@nestjs/common';
import { CreateBillRoomDto } from './dto/create-bill_room.dto';
import { UpdateBillRoomDto } from './dto/update-bill_room.dto';

@Injectable()
export class BillRoomsService {
  create(createBillRoomDto: CreateBillRoomDto) {
    return 'This action adds a new billRoom';
  }

  findAll() {
    return `This action returns all billRooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billRoom`;
  }

  update(id: number, updateBillRoomDto: UpdateBillRoomDto) {
    return `This action updates a #${id} billRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} billRoom`;
  }
}
