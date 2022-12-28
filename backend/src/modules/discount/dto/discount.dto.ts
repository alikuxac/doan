import {
  IsNumber,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { DiscountType } from '../discount.enum';

export class createDiscountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  percent: number;

  @IsEnum(DiscountType)
  @IsNotEmpty()
  type: DiscountType;

  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  total: number;
}

export class updateDiscountDto extends PartialType(createDiscountDto) {}
