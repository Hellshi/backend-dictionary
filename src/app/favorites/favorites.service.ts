import { Injectable } from '@nestjs/common';
import { CursorPaginationDto } from 'src/common/dto/cursorPagination.dto';
import { CursorPagination } from 'src/database/repositories/common/interfaces/baseRepository.interface';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';

@Injectable()
export class FavoritesService {
  constructor(private readonly repositoryCatalog: RepositoryCatalog) {}

  async favoriteWord({ userId, word }: { userId: string; word: string }) {
    const { id } = await this.repositoryCatalog.word.findOneOrFail({
      word,
    });

    await this.repositoryCatalog.userFavorites.insert({
      userId,
      wordId: id,
    });
  }

  async unfavoriteWord({ userId, word }: { userId: string; word: string }) {
    const { id } = await this.repositoryCatalog.word.findOneOrFail({
      word,
    });

    await this.repositoryCatalog.userFavorites.unfavoriteWord({
      userId,
      word: id,
    });
  }

  async getFavorites({
    userId,
    pagination,
  }: {
    userId: string;
    pagination: CursorPaginationDto;
  }) {
    return this.repositoryCatalog.userFavorites.getFavorites({
      userId,
      pagination,
    });
  }
}
