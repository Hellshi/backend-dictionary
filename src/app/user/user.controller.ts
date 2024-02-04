import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { BasicAuth } from '../auth/decorators/basic-auth.decorator';
import { CreateUserDto } from './types/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @BasicAuth()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
