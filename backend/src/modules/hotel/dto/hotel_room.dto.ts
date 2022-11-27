import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

import { HotelRoomStatus, HotelRoomType } from '../enum/hotel_room.enum';

export class createHotelRoomDto {
  @IsNumber()
  @IsNotEmpty()
  hotelId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  roomTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  room_number: number;

  @IsEnum(HotelRoomStatus)
  @IsOptional()
  status: HotelRoomStatus;

  @IsEnum(HotelRoomType)
  @IsOptional()
  type: HotelRoomType;
}

export class updateHotelRoomDto extends PartialType(createHotelRoomDto) {}
