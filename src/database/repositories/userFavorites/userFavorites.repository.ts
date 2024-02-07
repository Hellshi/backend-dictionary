import PostgresDataSource from 'src/config/postgres.config';
import { UserFavorites } from 'src/database/entities/userFavorites.pg.entity';
import BaseRepository from '../common/baseRepository';
import { Pagination } from '../common/interfaces/baseRepository.interface';
import { pagination as paginationHelper } from '../common/helpers/pagination';

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

  private async getCount(userId: any) {
    return this.repository
      .createQueryBuilder(this.queryAlias)
      .where(`${this.queryAlias}.userId = :userId`, { userId })
      .getCount();
  }

  async getFavorites({
    userId,
    pagination: { page = 1, take = 10 },
  }: {
    userId: string;
    pagination: Pagination;
  }) {
    const count = await this.getCount(userId);

    const query = this.repository
      .createQueryBuilder(this.queryAlias)
      .leftJoinAndSelect(`${this.queryAlias}.word`, 'word')
      .where(`${this.queryAlias}.userId = :userId`, { userId })
      .select([
        'word.word as word',
        `${this.queryAlias}.createdAt AS added`,
        `${this.queryAlias}.id AS id`,
      ])
      .skip((page - 1) * take)
      .limit(take);

    const test = await this.paginateByCursor({
      limit: 10,
      query,
      queryAlias: this.queryAlias,
      cursor: '83f1d63a-bee6-42f7-8233-75e8a6604954',
    });
    console.log(test);

    //return paginationHelper(response, page, take, count);
  }
}
