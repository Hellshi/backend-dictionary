import { Inject, Injectable } from '@nestjs/common';
import { WordObject } from 'src/app/proxy/adapters/types/wordsApiResponse';
import { MongoDbDataSource } from 'src/config/mongodb.config';
import repositoryCatalogFactory from 'src/database/repositories/common/factory/genericRepositoru.factory';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';

@Injectable()
export class MongoAdapterCacheService {
  constructor(
    @Inject('repositoryCatalog')
    private readonly repositoryCatalog: RepositoryCatalog,
  ) {}
  async set<T>({ key, value }: { key: string; value: T }): Promise<void> {
    await this.repositoryCatalog.mongoCache.set({
      key,
      value: JSON.stringify(value),
    });
  }

  async get<T>(key: string): Promise<string | undefined> {
    const cache = await this.repositoryCatalog.mongoCache.findOne({ key });
    if (!cache) {
      return undefined;
    }
    return cache.value;
  }

  registerWordCache(word: WordObject) {
    return this.set<WordObject>({ key: word.word, value: word });
  }

  async getWordFromCache({ word }: { word: string }) {
    const cache = await this.get<WordObject>(word);
    return JSON.stringify(cache);
  }
}
