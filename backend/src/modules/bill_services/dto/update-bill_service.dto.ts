import { PartialType } from '@nestjs/mapped-types';
import { CreateBillServiceDto } from './create-bill_service.dto';

export class UpdateBillServiceDto extends PartialType(CreateBillServiceDto) {}
