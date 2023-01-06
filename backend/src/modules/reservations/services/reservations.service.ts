import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import {
  createReservationDto,
  updateReservationDto,
} from '../dto/reservation.dto';
import { HotelService } from '@modules/hotel/services';
import { User } from '@modules/user/entities/user.entity';
import { ReservationRepository } from '../repository/reservations.repository';
import { HotelRoomRepository } from '@modules/hotel/repository/hotel_room.repository';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly hotelRoomRepository: HotelRoomRepository,
    private readonly hotelService: HotelService,
    private readonly userService: UserService,
  ) {}

  async create(dto: createReservationDto) {
    const { checkIn, checkOut, hotelId, roomId } = dto;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    this.reservationRepository.checkDateValid(checkInDate, checkOutDate);

    await this.reservationRepository.manager.transaction(
      'SERIALIZABLE',
      async (entityManager) => {
        let user: User | null = null;
        if (dto.userId) {
          user = await this.userService.findOne(dto.userId);
        }
        const hotel = await this.hotelService.findOne(hotelId);
        const room = await this.hotelRoomRepository.findOne({
          where: { id: roomId },
        });

        const newReservation = this.reservationRepository.create({
          checkIn,
          checkOut,
          hotel,
          name: dto.name,
          user,
          room,
          checkedIn: false,
        });

        return await entityManager.save(newReservation);
      },
    );
  }

  async findAll() {
    return await this.reservationRepository.find({ relations: ['rooms'] });
  }

  async findOne(id: string) {
    return await this.reservationRepository.findOne({
      where: { id },
      relations: { room: true },
    });
  }

  async update(id: string, dto: updateReservationDto) {
    const checkExist = await this.reservationRepository.findOneBy({ id });
    if (!checkExist) throw new BadRequestException('Invalid id');

    checkExist.checkIn = dto.checkIn ?? checkExist.checkIn;
    checkExist.checkOut = dto.checkOut ?? checkExist.checkOut;
    checkExist.guests = dto.guests ?? checkExist.guests;

    if (checkExist.checkIn.getTime() < new Date().getTime()) {
      throw new NotAcceptableException('Checkin date must be after now');
    }

    if (checkExist.checkIn.getTime() > checkExist.checkOut.getTime()) {
      throw new NotAcceptableException(
        'Checkin date must be before checkin date',
      );
    }
  }

  async remove(id: string) {
    const checkExist = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!checkExist) throw new BadRequestException('Invalid id');
    return await this.reservationRepository.delete(id);
  }
}
