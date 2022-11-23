import { Injectable } from '@nestjs/common';
import { CreateBillServiceDto } from './dto/create-bill_service.dto';
import { UpdateBillServiceDto } from './dto/update-bill_service.dto';

@Injectable()
export class BillServicesService {
  create(createBillServiceDto: CreateBillServiceDto) {
    return 'This action adds a new billService';
  }

  findAll() {
    return `This action returns all billServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billService`;
  }

  update(id: number, updateBillServiceDto: UpdateBillServiceDto) {
    return `This action updates a #${id} billService`;
  }

  remove(id: number) {
    return `This action removes a #${id} billService`;
  }
}
