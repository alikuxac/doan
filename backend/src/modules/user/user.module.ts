import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { HotelModule } from '@modules/hotel/hotel.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HotelModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}
  async onModuleInit() {
    await this.userService.init();
  }
}
