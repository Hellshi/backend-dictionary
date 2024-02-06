import { Inject, Injectable } from '@nestjs/common';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';

@Injectable()
export class MongoAdapterCacheService {
  constructor(
    @Inject('repositoryCatalog')
    private readonly repositoryCatalog: RepositoryCatalog,
  ) {}
  async set(key: string, value: string): Promise<void> {
    await this.repositoryCatalog.mongoCache.insert({ key, value });
  }

  async get(key: string): Promise<string | undefined> {
    const cache = await this.repositoryCatalog.mongoCache.findOne({ key });
    if (!cache) {
      return undefined;
    }
    return cache.value;
  }
}
