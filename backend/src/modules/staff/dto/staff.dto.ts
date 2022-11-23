import {
  IsNumber,
  IsOptional,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createStaffDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsNumber()
  @IsOptional()
  hotelId: number;
}

export class updateStaffDto extends PartialType(createStaffDto) {}

export class changeHotelDto {
  @IsNumber()
  @IsNotEmpty()
  hotelId: number;
}

export class assignRoleStaffDto {
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
