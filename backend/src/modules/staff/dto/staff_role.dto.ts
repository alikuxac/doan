import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createStaffRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  position: number;
}

export class updateStaffRoleDto extends PartialType(createStaffRoleDto) {}
