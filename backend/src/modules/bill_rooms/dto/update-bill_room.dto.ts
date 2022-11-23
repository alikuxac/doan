import { PartialType } from '@nestjs/mapped-types';
import { CreateBillRoomDto } from './create-bill_room.dto';

export class UpdateBillRoomDto extends PartialType(CreateBillRoomDto) {}
