import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationsRoomDto } from './create-reservations_room.dto';

export class UpdateReservationsRoomDto extends PartialType(CreateReservationsRoomDto) {}
