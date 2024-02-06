import { Cache } from 'src/database/entities/cache.mongo.entity';
import BaseRepository from '../common/baseRepository';
import { MongoDbDataSource } from 'src/config/mongodb.config';

export class CacheRepository extends BaseRepository<Cache> {
  constructor() {
    super(MongoDbDataSource.getRepository(Cache), Cache);
  }

  // Typeorm do not support native ttl creation
  async createTTLIndex(): Promise<void> {
    if (!(await this.checkIndexes()))
      await this.repository.manager
        .getMongoRepository(Cache)
        .createCollectionIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
  }

  async checkIndexes() {
    return this.repository.manager
      .getMongoRepository(Cache)
      .collectionIndexExists('createdAt_1');
  }
}
