import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserRole } from '../user.enum';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Username for user',
    name: 'username',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'Email for user', name: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Full name of user',
    name: 'fullName',
  })
  fullName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Phone number of user',
    name: 'phone',
  })
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password for user',
    name: 'password',
  })
  password?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  hotelId?: number;

  @IsEnum(UserRole, { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Role for user',
    enum: UserRole,
    enumName: 'User role',
    example: UserRole.USER,
  })
  role: UserRole[];
}

export class updateUserDto extends PartialType(createUserDto) {
  @IsString()
  @IsOptional()
  id: string;
}

export class assignRoleDto {
  @IsEnum(UserRole, { each: true })
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Role for user',
    enum: UserRole,
    enumName: 'User role',
  })
  role: UserRole[];
}

export class changeHotelDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ name: 'Hotel Id' })
  hotelId: number;
}
