import { Module } from '@nestjs/common';
import { BillServicesService } from './bill_services.service';
import { BillServicesController } from './bill_services.controller';

@Module({
  controllers: [BillServicesController],
  providers: [BillServicesService]
})
export class BillServicesModule {}
