import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { hotelArrayServices } from './services/';
import { hotelArrayController } from './controllers/';
import { hotelArray } from './entities/';
@Module({
  imports: [TypeOrmModule.forFeature([...hotelArray])],
  controllers: [...hotelArrayController],
  providers: [...hotelArrayServices],
  exports: [...hotelArrayServices],
})
export class HotelModule {}
