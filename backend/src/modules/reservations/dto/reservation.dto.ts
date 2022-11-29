import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  createReservationsRoomDto,
  updateReservationsRoomDto,
} from './reservations_room.dto';
import { PartialType, OmitType } from '@nestjs/swagger';

export class createReservationDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  hotelId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @IsNotEmpty()
  checkIn: Date;

  @IsDate()
  @IsNotEmpty()
  checkOut: Date;

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
