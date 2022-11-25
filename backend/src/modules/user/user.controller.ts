import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { assignRoleDto, createUserDto, updateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: createUserDto) {
    return await this.userService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: updateUserDto) {
    return await this.userService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  @Post(':id/role')
  async changeRole(@Param('id') id: string, @Body() dto: assignRoleDto) {
    return await this.userService.changeRole(+id, dto);
  }
}
