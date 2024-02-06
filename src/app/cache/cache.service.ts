import { Injectable } from '@nestjs/common';
import { MongoAdapterCacheService } from './adapters/mongoAdapter/mongoAdapterCache.service';
import { WordObject } from '../proxy/adapters/types/wordsApiResponse';

@Injectable()
export class CacheService {
  constructor(private readonly cacheService: MongoAdapterCacheService) {}

  async setWordCache(word: WordObject): Promise<void> {
    await this.cacheService.registerWordCache(word);
  }

  async getWordCache(key: string): Promise<WordObject> {
    return this.cacheService.getWordFromCache({
      word: key,
    }) as unknown as WordObject;
  }
}
