import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { Staff } from './entities/staff.entity';
import { StaffRole } from './entities/staff_role.entity';

import { HotelModule } from '@modules/hotel/hotel.module';
import { Hotel } from '@modules/hotel/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Staff, StaffRole, Hotel]), HotelModule],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule implements OnModuleInit {
  constructor(private readonly staffService: StaffService) {}
  async onModuleInit() {
    await this.staffService.init();
  }
}
