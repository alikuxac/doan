import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { hotelArrayServices } from './services/';
import { hotelArrayController } from './controllers/';
import { hotelArray } from './entities/';
import { hotelRepositoryArray } from './repository';
@Module({
  imports: [TypeOrmModule.forFeature([...hotelArray])],
  controllers: [...hotelArrayController],
  providers: [...hotelArrayServices, ...hotelRepositoryArray],
  exports: [...hotelArrayServices],
})
export class HotelModule {}
