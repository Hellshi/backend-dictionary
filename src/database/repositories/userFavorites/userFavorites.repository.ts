import PostgresDataSource from 'src/config/postgres.config';
import { UserFavorites } from 'src/database/entities/userFavorites.pg.entity';
import BaseRepository from '../common/baseRepository';

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
}
