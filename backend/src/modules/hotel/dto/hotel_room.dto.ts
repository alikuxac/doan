import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { HotelRoomStatus, HotelRoomType } from '../enum/hotel_room.enum';

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
  @IsNotEmpty()
  @ApiProperty()
  roomTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  room_number: number;

  @IsEnum(HotelRoomStatus)
  @IsOptional()
  @ApiProperty({ enum: HotelRoomStatus })
  status: HotelRoomStatus;

  @IsEnum(HotelRoomType)
  @IsOptional()
  @ApiProperty({ enum: HotelRoomType })
  type: HotelRoomType;
}

export class updateHotelRoomDto extends PartialType(createHotelRoomDto) {}
