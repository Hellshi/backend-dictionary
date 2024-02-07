import { Controller, Get, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuth } from '../auth/decorators/jwt-auth.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { CursorPaginationDto } from 'src/common/dto/cursorPagination.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get('me/history')
  @JwtAuth()
  async getHistory(
    @Request()
    req: any,
    @Query()
    pagination?: CursorPaginationDto,
  ) {
    const {
      user: { userId },
    } = req;

    return this.userService.getUserHistory({ pagination, userId });
  }

  @Get('me')
  @JwtAuth()
  async getUserProfile(@Request() req: any) {
    const {
      user: { userId },
    } = req;

    return this.userService.getUserProfile(userId);
  }

  @Get('me/favorites')
  @JwtAuth()
  async getFavorites(
    @Request() req: any,
    @Query() pagination: CursorPaginationDto,
  ) {
    const {
      user: { userId },
    } = req;
    return this.favoritesService.getFavorites({ userId, pagination });
  }
}
