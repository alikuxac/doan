import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createHotelRoomTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  bed: number;

  @IsNumber()
  @IsNotEmpty()
  max_people: number;

  @IsBoolean()
  @IsNotEmpty()
  extra_bed: boolean;
}

export class updateHotelRoomTypeDto extends PartialType(
  createHotelRoomTypeDto,
) {}
