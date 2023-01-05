import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PaidStatus } from '../entities/invoice.entity';

export class createInvoiceDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsEnum(PaidStatus)
  @IsNotEmpty()
  @ApiProperty({ enum: PaidStatus, enumName: 'status' })
  status: string;
}

export class updateInvoiceDto extends PartialType(createInvoiceDto) {}
