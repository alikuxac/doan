import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
}

export class updateHotelRoomDto extends PartialType(createHotelRoomDto) {}
