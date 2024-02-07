import PostgresDataSource from 'src/config/postgres.config';
import { UserFavorites } from 'src/database/entities/userFavorites.pg.entity';
import BaseRepository from '../common/baseRepository';
import { CursorPagination } from '../common/interfaces/baseRepository.interface';

export class UserFavoritesRepository extends BaseRepository<UserFavorites> {
  constructor() {
    super(PostgresDataSource.getRepository(UserFavorites), UserFavorites);
  }

  readonly queryAlias = 'userFavorites';

  async unfavoriteWord({ userId, word }: { userId: string; word: string }) {
    return this.repository.delete({
      userId,
      wordId: word,
    });
  }

  async getFavorites({
    userId,
    pagination: { cursor = null, take = 10 },
  }: {
    userId: string;
    pagination: CursorPagination;
  }) {
    const query = this.repository
      .createQueryBuilder(this.queryAlias)
      .leftJoinAndSelect(`${this.queryAlias}.word`, 'word')
      .where(`${this.queryAlias}.userId = :userId`, { userId })
      .select([
        'word.word as word',
        `${this.queryAlias}.createdAt AS added`,
        `${this.queryAlias}.id AS id`,
      ]);

    return this.paginateByCursor({
      limit: take,
      query,
      queryAlias: this.queryAlias,
      cursor,
    });
  }
}
