import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';

import { UserRole } from '../user.enum';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(UserRole)
  @IsOptional()
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
  role: UserRole;
}
