import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { createInvoiceDto, updateInvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async create(dto: createInvoiceDto) {
    const checkInvoice = await this.invoiceRepository.create();
    return 'This action adds a new invoice';
  }

  async findAll() {
    return `This action returns all invoice`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} invoice`;
  }

  async update(id: string, dto: updateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  async remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
