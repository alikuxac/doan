import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { createDiscountDto, updateDiscountDto } from './dto/discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() dto: createDiscountDto) {
    return this.discountService.create(dto);
  }

  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: updateDiscountDto) {
    return this.discountService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountService.remove(+id);
  }
}
