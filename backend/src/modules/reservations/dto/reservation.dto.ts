import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  // ValidateNested,
} from 'class-validator';
// import { Type } from 'class-transformer';
// import {
// createReservationsRoomDto,
// updateReservationsRoomDto,
// } from './reservations_room.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class createReservationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

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
  adults: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  childrends: number;

  // @Type(() => createReservationDto)
  // @ValidateNested({ each: true })
  // rooms: createReservationsRoomDto[];
}

export class updateReservationDto extends PartialType(createReservationDto) {
  // @Type(() => createReservationDto)
  // @ValidateNested({ each: true })
  // rooms: updateReservationsRoomDto[];
}
