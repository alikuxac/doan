import { Module } from '@nestjs/common';
import { ReservationsRoomService } from './reservations_room.service';
import { ReservationsRoomController } from './reservations_room.controller';

@Module({
  controllers: [ReservationsRoomController],
  providers: [ReservationsRoomService]
})
export class ReservationsRoomModule {}
