import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { createDiscountDto, updateDiscountDto } from './dto/discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  create(dto: createDiscountDto) {
    return 'This action adds a new discount';
  }

  findAll() {
    return `This action returns all discount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number, dto: updateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
