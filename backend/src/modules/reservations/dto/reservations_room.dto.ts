import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class createReservationsRoomDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsNumber({ allowNaN: false }, { each: true })
  @IsOptional()
  roomNumber: number[];
}

export class updateReservationsRoomDto extends PartialType(
  createReservationsRoomDto,
) {}
