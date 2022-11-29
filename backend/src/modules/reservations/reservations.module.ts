import { Module } from '@nestjs/common';
import { ReservationsService } from './services/reservations.service';
import { ReservationsController } from './controllers/reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation, ReservationsRoom } from './entities';
import { Hotel } from '@modules/hotel/entities/hotel.entity';
import { HotelModule } from '@modules/hotel/hotel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, ReservationsRoom, Hotel]),
    HotelModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
