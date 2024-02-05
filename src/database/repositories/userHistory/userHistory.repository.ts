import { UserHistory } from 'src/database/entities/userHistory.mongo.entity';
import BaseRepository from '../common/baseRepository';
import { MongoDbDataSource } from 'src/config/mongodb.config';

export class UserHistoryRepository extends BaseRepository<UserHistory> {
  constructor() {
    super(MongoDbDataSource.getRepository(UserHistory), UserHistory);
  }
}
