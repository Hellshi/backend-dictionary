import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { JwtAuth } from '../auth/decorators/jwt-auth.decorator';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  ContextDecorator,
  RegisterHistoryDecorator,
} from '../../common/decorators/register-history.decorator';
import { FavoritesService } from '../favorites/favorites.service';
import { WordsService } from '../words/words.service';
import { CursorPaginationDto } from '../../database/repositories/common/dto/cursorPagination.dto';
import { Response, Request } from 'express';

@ApiTags('proxy')
@Controller('entries')
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly favoritesService: FavoritesService,
    private readonly wordService: WordsService,
  ) {}

  @Get('en')
  @JwtAuth()
  @ApiQuery({ name: 'search', required: false })
  async list(
    @Query(ValidationPipe)
    pagination: CursorPaginationDto,
    @Query('search')
    search?: string,
  ) {
    try {
      return this.wordService.list({ search, pagination });
    } catch (error) {
      throw error;
    }
  }

  @Post('en/:word/favorite')
  @JwtAuth()
  async favorite(
    @Param('word') word: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const {
      user: { userId },
    } = req;

    await this.favoritesService.favoriteWord({ userId, word });
    res.status(204).send();
  }

  @Delete('en/:word/unfavorite')
  @JwtAuth()
  async unfavorite(
    @Param('word') word: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const {
      user: { userId },
    } = req;

    await this.favoritesService.unfavoriteWord({ userId, word });
    res.status(204).send();
  }

  @Get('en/:word')
  @JwtAuth()
  @ApiParam({ name: 'word', required: true })
  @RegisterHistoryDecorator()
  async define(
    @Param('word') word: string,
    @ContextDecorator() _context: { request: Request; response: Response },
  ) {
    return this.proxyService.define(word, _context);
  }
}
