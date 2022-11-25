import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { Staff } from './entities/staff.entity';

import { HotelModule } from '@modules/hotel/hotel.module';
import { Hotel } from '@modules/hotel/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, Hotel]), HotelModule],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
