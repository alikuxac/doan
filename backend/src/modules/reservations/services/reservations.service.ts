import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  createReservationDto,
  updateReservationDto,
} from '../dto/reservation.dto';
import { ReservationsRoom, Reservation } from '../entities';
import { HotelService } from '@modules/hotel/services';
import {
  createReservationsRoomDto,
  updateReservationsRoomDto,
} from '../dto/reservations_room.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(ReservationsRoom)
    private readonly reservationRoomRepository: Repository<ReservationsRoom>,
    private readonly hotelService: HotelService,
  ) {}

  async create(dto: createReservationDto) {
    const { checkIn, checkOut } = dto;
    if (checkIn.getTime() < new Date().getTime()) {
      throw new NotAcceptableException('Checkin date must be after now');
    }
    if (checkOut.getTime() < checkIn.getTime()) {
      throw new NotAcceptableException(
        'Checkout date must be after checkin date',
      );
    }
    const rooms = [];
    for (const room of dto.rooms) {
      const newRoom = this.reservationRoomRepository.create({
        bed: room.bed ?? 1,
        adults: room.adults ?? 1,
        childrens: room.childrens ?? 0,
        extra_bed: room.extra_bed ?? false,
      });
      rooms.push(newRoom);
    }

    const hotel = await this.hotelService.findOne(dto.hotelId);
    if (hotel) throw new ConflictException('Invlid hotel id');
    const newReservation = this.reservationRepository.create({
      ...dto,
      hotel,
      rooms,
    });

    return await this.reservationRepository.save(newReservation);
  }

  async findAll() {
    return await this.reservationRepository.find({
      relations: { rooms: true },
    });
  }

  async findOne(id: number) {
    return await this.reservationRepository.findOne({
      where: { id },
      relations: { rooms: true },
    });
  }

  async update(id: number, dto: updateReservationDto) {
    const checkExist = await this.reservationRepository.findOneBy({ id });
    if (!checkExist) throw new ConflictException('Invalid id');

    checkExist.checkIn = dto.checkIn ?? checkExist.checkIn;
    checkExist.checkOut = dto.checkOut ?? checkExist.checkOut;
    checkExist.name = dto.name ?? checkExist.name;

    if (checkExist.checkIn.getTime() < new Date().getTime()) {
      throw new NotAcceptableException('Checkin date must be after now');
    }

    if (checkExist.checkIn.getTime() > checkExist.checkOut.getTime()) {
      throw new NotAcceptableException(
        'Checkin date must be before checkin date',
      );
    }

    if (dto.rooms.length > 1) {
      for (const room of dto.rooms) {
        const currRoom = await this.reservationRoomRepository.findOneBy({
          id: room.id,
        });
        if (!currRoom) continue;
        currRoom.adults = room.adults ?? currRoom.adults;
        currRoom.bed = room.bed ?? currRoom.bed;
        currRoom.childrens = room.childrens ?? currRoom.childrens;
        currRoom.extra_bed = room.extra_bed ?? currRoom.extra_bed;
      }
    }
  }

  async remove(id: number) {
    const checkExist = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!checkExist) throw new BadRequestException('Invalid id');
    return await this.reservationRepository.delete(id);
  }

  async createResRoom(id: number, dto: createReservationsRoomDto) {
    const checkExist = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!checkExist) throw new BadRequestException('Invalid id');
    const newResRoom = this.reservationRoomRepository.create({
      adults: dto.adults,
      bed: dto.bed,
      childrens: dto.childrens,
      extra_bed: dto.extra_bed,
      type: dto.type,
    });
    checkExist.rooms.push(newResRoom);
    return await this.reservationRepository.save(checkExist);
  }

  async findOneResRoom(id: number) {
    return await this.reservationRoomRepository.findOne({ where: { id } });
  }

  async updateResRoom(id: number, dto: updateReservationsRoomDto) {
    const checkExist = await this.reservationRoomRepository.findOne({
      where: { id },
    });
    if (!checkExist) throw new BadRequestException('Invalid id');
    checkExist.adults = dto.adults ?? checkExist.adults;
    checkExist.bed = dto.bed ?? checkExist.bed;
    checkExist.childrens = dto.childrens ?? checkExist.childrens;
    checkExist.extra_bed = dto.extra_bed ?? checkExist.extra_bed;
    checkExist.type = dto.type ?? checkExist.type;
    return await this.reservationRoomRepository.save(checkExist);
  }

  async removeResRoom(id: number) {
    const checkExist = await this.reservationRoomRepository.findOne({
      where: { id },
    });
    if (!checkExist) throw new BadRequestException('Invalid id');
    return await this.reservationRoomRepository.delete(id);
  }
}
