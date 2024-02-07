import PostgresDataSource from '../../../config/postgres.config';
import { User } from '../../../database/entities/user.pg.entity';
import BaseRepository from '../common/baseRepository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(PostgresDataSource.getRepository(User), User);
  }

  async getUserProfile(id: string): Promise<User> {
    return this.repository.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
    });
  }
}
