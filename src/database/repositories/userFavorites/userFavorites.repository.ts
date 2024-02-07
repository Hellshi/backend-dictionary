import PostgresDataSource from 'src/config/postgres.config';
import { UserFavorites } from 'src/database/entities/userFavorites.pg.entity';
import BaseRepository from '../common/baseRepository';
import { Pagination } from '../common/interfaces/baseRepository.interface';
import { pagination as paginationHelper } from '../common/helpers/pagination';

export class UserFavoritesRepository extends BaseRepository<UserFavorites> {
  constructor() {
    super(PostgresDataSource.getRepository(UserFavorites), UserFavorites);
  }

  async unfavoriteWord({ userId, word }: { userId: string; word: string }) {
    return this.repository.delete({
      userId,
      wordId: word,
    });
  }

  private async getCount(userId: any) {
    return this.repository
      .createQueryBuilder('userFavorites')
      .where('userFavorites.userId = :userId', { userId })
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

    const response = await this.repository
      .createQueryBuilder('userFavorites')
      .leftJoinAndSelect('userFavorites.word', 'word')
      .where('userFavorites.userId = :userId', { userId })
      .select(['word.word as word', 'userFavorites.createdAt AS added'])
      .skip((page - 1) * take)
      .take(take)
      .getRawMany();

    return paginationHelper(response, page, take, count);
  }
}
