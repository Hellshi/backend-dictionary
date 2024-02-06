import { Cache } from 'src/database/entities/cache.mongo.entity';
import BaseRepository from '../common/baseRepository';
import { MongoDbDataSource } from 'src/config/mongodb.config';

export class CacheRepository extends BaseRepository<Cache> {
  constructor() {
    super(MongoDbDataSource.getRepository(Cache), Cache);
  }
}
