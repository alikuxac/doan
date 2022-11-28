import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

import { UserService } from './user.service';
import { assignRoleDto, createUserDto, updateUserDto } from './dto/user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: createUserDto })
  async create(@Body() dto: createUserDto) {
    return await this.userService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(@Param('id') id: string, @Body() dto: updateUserDto) {
    return await this.userService.update(+id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  @Post(':id/role')
  @ApiParam({ name: 'id' })
  async changeRole(@Param('id') id: string, @Body() dto: assignRoleDto) {
    return await this.userService.changeRole(+id, dto);
  }
}
