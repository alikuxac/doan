import { Module } from '@nestjs/common';
import { HotelServiceService } from './hotel_service.service';
import { HotelServiceController } from './hotel_service.controller';

@Module({
  controllers: [HotelServiceController],
  providers: [HotelServiceService],
})
export class HotelServiceModule {}
