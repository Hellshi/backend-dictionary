import { Inject, Injectable } from '@nestjs/common';
import { WordObject } from 'src/app/proxy/adapters/types/wordsApiResponse';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';

@Injectable()
export class MongoAdapterCacheService {
  constructor(
    @Inject('repositoryCatalog')
    private readonly repositoryCatalog: RepositoryCatalog,
  ) {}

  async set<T>({ key, value }: { key: string; value: T }): Promise<void> {
    await this.repositoryCatalog.mongoCache.insert({
      key,
      value: JSON.stringify(value),
    });
  }

  async get<T>(key: string): Promise<string | undefined> {
    const cache = await this.repositoryCatalog.mongoCache.findOne({ key });
    if (!cache) {
      return undefined;
    }
    return JSON.parse(cache.value);
  }

  async registerWordCache(word: WordObject) {
    await this.createTTLIndex();
    return this.set<WordObject>({ key: word.word, value: word });
  }

  async getWordFromCache({ word }: { word: string }) {
    const cache = await this.get<WordObject>(word);
    return cache;
  }

  private async createTTLIndex() {
    if (await this.repositoryCatalog.mongoCache.checkIfTTLExists()) return;
    await this.repositoryCatalog.mongoCache.createTTLIndex();
  }
}
