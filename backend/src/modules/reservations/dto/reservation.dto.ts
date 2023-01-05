import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  ValidateNested,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  createReservationsRoomDto,
  updateReservationsRoomDto,
} from './reservations_room.dto';

export class createReservationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  hotelId: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  checkIn: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  checkOut: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  guests: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  childrends: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  roomCount: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  userId?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @Type(() => createReservationDto)
  @ValidateNested({ each: true })
  rooms: createReservationsRoomDto[];
}

export class updateReservationDto extends PartialType(
  OmitType(createReservationDto, ['rooms'] as const),
) {
  @Type(() => createReservationDto)
  @ValidateNested({ each: true })
  rooms: updateReservationsRoomDto[];
}
