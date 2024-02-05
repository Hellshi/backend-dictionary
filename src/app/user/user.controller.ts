import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { BasicAuth } from '../auth/decorators/basic-auth.decorator';
import { CreateUserDto } from './types/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '../auth/decorators/jwt-auth.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @BasicAuth()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get('me/history')
  @JwtAuth()
  async getHistory(
    @Query()
    pagination: PaginationDto,
    @Request() req: any,
  ) {
    const {
      user: { userId },
    } = req;

    return this.userService.getUserHistory({ pagination, userId });
  }
}
