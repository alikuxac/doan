import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
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
    description: 'First name of user',
    name: 'firstName',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Last name of user',
    name: 'lastName',
  })
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Phone number of user',
    name: 'phone',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Password for user',
    name: 'password',
    default: null,
  })
  password?: string;

  @IsEnum(UserRole)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Role for user',
    enum: UserRole,
    enumName: 'User role',
    example: UserRole.USER,
  })
  role: UserRole;
}

export class updateUserDto extends PartialType(createUserDto) {
  @IsString()
  @IsOptional()
  id: string;
}

export class assignRoleDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Role for user',
    enum: UserRole,
    enumName: 'User role',
  })
  role: UserRole;
}
