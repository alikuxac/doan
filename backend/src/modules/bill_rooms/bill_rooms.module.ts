import { Module } from '@nestjs/common';
import { BillRoomsService } from './bill_rooms.service';
import { BillRoomsController } from './bill_rooms.controller';

@Module({
  controllers: [BillRoomsController],
  providers: [BillRoomsService]
})
export class BillRoomsModule {}
