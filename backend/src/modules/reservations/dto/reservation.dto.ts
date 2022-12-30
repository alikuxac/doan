import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  ValidateNested,
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
  @IsNotEmpty()
  @ApiProperty()
  name: string;

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
