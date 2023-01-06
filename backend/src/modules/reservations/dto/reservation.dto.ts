import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

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
  roomId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  userId?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;
}

export class updateReservationDto extends PartialType(createReservationDto) {}
