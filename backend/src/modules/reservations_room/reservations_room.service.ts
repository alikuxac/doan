import { Injectable } from '@nestjs/common';
import { CreateReservationsRoomDto } from './dto/create-reservations_room.dto';
import { UpdateReservationsRoomDto } from './dto/update-reservations_room.dto';

@Injectable()
export class ReservationsRoomService {
  create(createReservationsRoomDto: CreateReservationsRoomDto) {
    return 'This action adds a new reservationsRoom';
  }

  findAll() {
    return `This action returns all reservationsRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservationsRoom`;
  }

  update(id: number, updateReservationsRoomDto: UpdateReservationsRoomDto) {
    return `This action updates a #${id} reservationsRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservationsRoom`;
  }
}
