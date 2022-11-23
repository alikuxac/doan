import { Module } from '@nestjs/common';
import { HotelRoomService } from './hotel_room.service';
import { HotelRoomController } from './hotel_room.controller';

@Module({
  controllers: [HotelRoomController],
  providers: [HotelRoomService],
})
export class HotelRoomModule {}
