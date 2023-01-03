import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import {
//   // LessThan,
//   LessThanOrEqual,
//   // MoreThan,
//   MoreThanOrEqual,
// } from 'typeorm';
import {
  createReservationDto,
  updateReservationDto,
} from '../dto/reservation.dto';
// import { Reservation } from '../entities';
import { HotelService } from '@modules/hotel/services';
// import { HotelRoom } from '@modules/hotel/entities/hotel_room.entity';
// import { HotelRoomStatus } from '@modules/hotel/enum/hotel_room.enum';
import { User } from '@modules/user/entities/user.entity';
import { ReservationRepository } from '../repository/reservations.repository';
import { HotelRoomRepository } from '@modules/hotel/repository/hotel_room.repository';
// import { ReservationsRoom } from '../entities/reservations_room.entity';
import { ReservationsRoomRepository } from '../repository/reservations_room.repository';
// import {
//   createReservationsRoomDto,
//   updateReservationsRoomDto,
// } from '../dto/reservations_room.dto';

@Injectable()
export class ReservationsService {
  constructor(
    // @InjectRepository(Reservation)
    private readonly reservationRepository: ReservationRepository,
    // @InjectRepository(HotelRoom)
    private readonly hotelRoomRepository: HotelRoomRepository,
    // @InjectRepository(ReservationsRoom)
    private readonly reservationRoomRepository: ReservationsRoomRepository,
    private readonly hotelService: HotelService,
  ) {}

  async create(user: User, dto: createReservationDto) {
    const { checkIn, checkOut, rooms, hotelId, childrends, roomCount } = dto;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    this.reservationRepository.checkDateValid(checkInDate, checkOutDate);

    await this.reservationRepository.manager.transaction(
      'SERIALIZABLE',
      async (entityManager) => {
        const hotel = await this.hotelService.findOne(hotelId);

        if (childrends > 0 && hotel.noChildren) {
          throw new BadRequestException('This hotel is not accept children');
        }

        const newReservation = this.reservationRepository.create({
          checkIn,
          checkOut,
          hotel,
          name: dto.name,
          user,
          checkedIn: false,
        });

        const roomArray = [];
        for (const room of rooms) {
          const hotelRoom = await this.hotelRoomRepository.findOne({
            where: { id: room.roomId },
          });

          const newRoom = this.reservationRoomRepository.create();

          newRoom.roomNumbers = room.roomNumbers;
          newRoom.hotelRoom = hotelRoom;

          roomArray.push(newRoom);
        }

        newReservation.rooms = roomArray;
        newReservation.roomCount = roomCount;

        return await entityManager.save(newReservation);
      },
    );
  }

  async findAll() {
    // TODO: add rooms later
    return await this.reservationRepository.find({ relations: ['rooms'] });
  }

  async findOne(id: string) {
    return await this.reservationRepository.findOne({
      where: { id },
      relations: { rooms: true },
      //TODO: add room later. code -> relations: { rooms: true },
    });
  }

  async update(id: string, dto: updateReservationDto) {
    const checkExist = await this.reservationRepository.findOneBy({ id });
    if (!checkExist) throw new BadRequestException('Invalid id');

    checkExist.checkIn = dto.checkIn ?? checkExist.checkIn;
    checkExist.checkOut = dto.checkOut ?? checkExist.checkOut;
    checkExist.name = dto.name ?? checkExist.name;
    checkExist.childrens = dto.childrends ?? checkExist.childrens;
    checkExist.guests = dto.guests ?? checkExist.guests;

    if (checkExist.checkIn.getTime() < new Date().getTime()) {
      throw new NotAcceptableException('Checkin date must be after now');
    }

    if (checkExist.checkIn.getTime() > checkExist.checkOut.getTime()) {
      throw new NotAcceptableException(
        'Checkin date must be before checkin date',
      );
    }

    // if (dto.rooms.length > 1) {
    //   for (const room of dto.rooms) {
    //     const currRoom = await this.reservationRoomRepository.findOneBy({
    //       id: room.id,
    //     });
    //     if (!currRoom) continue;
    //     currRoom.adults = room.adults ?? currRoom.adults;
    //     currRoom.bed = room.bed ?? currRoom.bed;
    //     currRoom.childrens = room.childrens ?? currRoom.childrens;
    //     currRoom.extra_bed = room.extra_bed ?? currRoom.extra_bed;
    //   }
    // }
  }

  async remove(id: string) {
    const checkExist = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!checkExist) throw new BadRequestException('Invalid id');
    return await this.reservationRepository.delete(id);
  }
}
