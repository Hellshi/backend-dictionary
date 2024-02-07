import { Cache } from '../../../database/entities/cache.mongo.entity';
import BaseRepository from '../common/baseRepository';
import { MongoDbDataSource } from '../../../config/mongodb.config';

export class CacheRepository extends BaseRepository<Cache> {
  constructor() {
    super(MongoDbDataSource.getRepository(Cache), Cache);
  }

  // Typeorm do not support native ttl creation
  createTTLIndex(): Promise<string> {
    return this.repository.manager
      .getMongoRepository(Cache)
      .createCollectionIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
  }

  checkIfTTLExists() {
    return this.repository.manager
      .getMongoRepository(Cache)
      .collectionIndexExists('createdAt_1');
  }
}
