import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class createReservationsRoomDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsNumber()
  @IsNotEmpty()
  bed: number;

  @IsNumber()
  @IsNotEmpty()
  adults: number;

  @IsBoolean()
  @IsOptional()
  extra_bed: boolean;

  @IsNumber({ allowNaN: false }, { each: true })
  @IsOptional()
  child_ages: number[];
}

export class updateReservationsRoomDto extends PartialType(
  createReservationsRoomDto,
) {}
