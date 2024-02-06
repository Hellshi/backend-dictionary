import { Cache } from 'src/database/entities/cache.mongo.entity';
import BaseRepository from '../common/baseRepository';
import { MongoDbDataSource } from 'src/config/mongodb.config';

export class CacheRepository extends BaseRepository<Cache> {
  constructor() {
    super(MongoDbDataSource.getRepository(Cache), Cache);
  }

  async set({ key, value }: { key: string; value: string }): Promise<void> {
    await this.repository.manager
      .getMongoRepository(Cache)
      .save({ key, value, createdAt: new Date() });
  }
}
