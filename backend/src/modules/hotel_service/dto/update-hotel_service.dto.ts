import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelServiceDto } from './create-hotel_service.dto';

export class UpdateHotelServiceDto extends PartialType(CreateHotelServiceDto) {}
