import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { HotelRoomType } from '../enum/hotel_room.enum';

export class createHotelRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty({ each: true })
  @ApiProperty()
  roomNumber: number[];

  @IsEnum(HotelRoomType)
  @IsOptional()
  @ApiProperty({ enum: HotelRoomType })
  type: HotelRoomType;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  hotelId: number;
}

export class updateHotelRoomDto extends PartialType(createHotelRoomDto) {}
