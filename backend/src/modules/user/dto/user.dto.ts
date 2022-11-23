import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

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
}

export class updateUserDto extends PartialType(createUserDto) {
  @IsString()
  @IsOptional()
  id: string;
}
