import { Module } from '@nestjs/common';
import { ReservationsService } from './services/reservations.service';
import { ReservationsController } from './controllers/reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities';
import { Hotel } from '@modules/hotel/entities/hotel.entity';
import { HotelModule } from '@modules/hotel/hotel.module';
import { BullModule } from '@nestjs/bull';
import { HotelRoom } from '@modules/hotel/entities/hotel_room.entity';
import { ReservationsRoom } from './entities/reservations_room.entity';
import { reservationRepositoryArrays } from './repository';
import { HotelRoomRepository } from '@modules/hotel/repository/hotel_room.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Hotel, HotelRoom, ReservationsRoom]),
    BullModule.registerQueue({
      name: 'reservations',
    }),
    HotelModule,
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ...reservationRepositoryArrays,
    HotelRoomRepository,
  ],
  exports: [ReservationsService],
})
export class ReservationsModule {}
