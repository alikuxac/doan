import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Reservation } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';

// import { JobData } from '../interfaces/job.interface';
import { UserService } from '@modules/user/user.service';
import { HotelService } from '@modules/hotel/services';
import { Repository } from 'typeorm';
import { createReservationDto } from '../dto/reservation.dto';

@Processor({ name: 'reservations' })
export class ReservationQueueProcess {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly userService: UserService,
    private readonly hotelService: HotelService,
  ) {}

  @Process()
  async create(job: Job<createReservationDto>) {
    const { checkIn, checkOut, hotelId, name } = job.data;
    const hotel = await this.hotelService.findOne(hotelId);
    if (!hotel) return await job.moveToFailed({ message: 'invalid hotel' });
    // const user = await this.userService.findOne(userId);
    // if (!user) return await job.moveToFailed({ message: 'invalid user' });
    const newReservation = this.reservationRepository.create({
      checkIn,
      checkOut,
      hotel,
      name,
      // user,
      checkedIn: false,
    });
    return true;
  }
}
