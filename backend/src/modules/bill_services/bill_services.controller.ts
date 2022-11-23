import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BillServicesService } from './bill_services.service';
import { CreateBillServiceDto } from './dto/create-bill_service.dto';
import { UpdateBillServiceDto } from './dto/update-bill_service.dto';

@Controller('bill-services')
export class BillServicesController {
  constructor(private readonly billServicesService: BillServicesService) {}

  @Post()
  create(@Body() createBillServiceDto: CreateBillServiceDto) {
    return this.billServicesService.create(createBillServiceDto);
  }

  @Get()
  findAll() {
    return this.billServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billServicesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBillServiceDto: UpdateBillServiceDto,
  ) {
    return this.billServicesService.update(+id, updateBillServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billServicesService.remove(+id);
  }
}
