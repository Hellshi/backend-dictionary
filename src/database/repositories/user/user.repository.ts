import PostgresDataSource from 'src/config/postgres.config';
import { User } from 'src/database/entities/user/user.pg.entity';
import BaseRepository from '../common/baseRepository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(PostgresDataSource.getRepository(User), User);
  }
}
