import { IsString, IsNotEmpty, IsBoolean, IsEnum } from 'class-validator';
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
