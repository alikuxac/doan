import { HotelRoomType } from '@modules/hotel/enum/hotel_room.enum';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class createReservationsRoomDto {
  @IsNumber()
  @IsNotEmpty()
  bed: number;

  @IsNumber()
  @IsNotEmpty()
  adults: number;

  @IsNumber()
  @IsNotEmpty()
  childrens: number;

  @IsBoolean()
  @IsOptional()
  extra_bed: boolean;

  @IsEnum(HotelRoomType)
  @IsOptional()
  type: HotelRoomType;
}

export class updateReservationsRoomDto extends PartialType(
  createReservationsRoomDto,
) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
