import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { JwtAuth } from '../auth/decorators/jwt-auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
  ContextDecorator,
  RegisterHistoryDecorator,
} from 'src/common/decorators/register-history.decorator';
import { FavoritesService } from '../favorites/favorites.service';

@ApiTags('proxy')
@Controller('entries')
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get('en/:word')
  @JwtAuth()
  @RegisterHistoryDecorator()
  async define(
    @Param('word') word: string,
    @ContextDecorator() _context: { request: Request },
  ) {
    return this.proxyService.define(word);
  }

  @Post('en/:word/favorite')
  @JwtAuth()
  async favorite(@Param('word') word: string, @Req() req: any) {
    const {
      user: { userId },
    } = req;

    await this.favoritesService.favoriteWord({ userId, word });
  }

  @Delete('en/:word/unfavorite')
  @JwtAuth()
  async unfavorite(@Param('word') word: string, @Req() req: any) {
    const {
      user: { userId },
    } = req;

    await this.favoritesService.unfavoriteWord({ userId, word });
  }
}
