import { Injectable } from '@nestjs/common';
import { MongoAdapterCacheService } from './adapters/mongoAdapter/mongoAdapterCache.service';

@Injectable()
export class CacheService {
  constructor(private readonly cacheService: MongoAdapterCacheService) {}

  async set<T>(key: string, value: T): Promise<void> {
    await this.cacheService.set(
      key,
      JSON.stringify({ data: value, time: new Date() }),
    );
  }

  async get<T>(key: string): Promise<T | undefined> {
    console.log(`getting ${key}`);
    return JSON.parse(await this.cacheService.get(key));
  }
}
