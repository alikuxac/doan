import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
  IsUrl,
  IsBoolean,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PickType,
} from '@nestjs/swagger';

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

  @IsNumber({ allowNaN: false }, { each: true })
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  maxOccupancy: number;

  @IsUrl({}, { each: true })
  @IsNotEmpty()
  @ApiProperty()
  photo: string[];

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  allowRefund: boolean;
}

export class updateHotelRoomDto extends PartialType(
  OmitType(createHotelRoomDto, ['roomNumber'] as const),
) {}

export class updateHotelRoomNumberDto extends PickType(createHotelRoomDto, [
  'roomNumber',
  'hotelId',
] as const) {
  @IsEnum(['inc', 'dec'])
  @IsNotEmpty()
  @ApiProperty()
  action: 'inc' | 'dec';
}
