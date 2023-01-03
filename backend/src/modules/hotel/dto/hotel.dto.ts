import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { HotelType } from '../enum/hotel.enum';

export class createHotelDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  taxcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  country: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  noChildren: string;

  @IsEnum(HotelType)
  @IsNotEmpty()
  @ApiProperty()
  type: HotelType;
}

export class updateHotelDto extends PartialType(createHotelDto) {}

export class getAvailableRoomHotelDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  checkIn: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  checkOut: Date;
}
