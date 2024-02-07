import 'jest-extended';

import { Test, TestingModule } from '@nestjs/testing';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { setProxyUrlProvider } from '../../providers/proxy-url-injection-provider';
import { FavoritesModule } from '../favorites/favorites.module';
import { WordsModule } from '../words/words.module';
import { AxiosAdapterService } from './adapters/axiosAdapter/axiosAdapter.service';
import { CacheModule } from '../cache/cache.module';

describe('ProxyController', () => {
  let controller: ProxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FavoritesModule, CacheModule, WordsModule],
      controllers: [ProxyController],
      providers: [
        ProxyService,
        AxiosAdapterService,
        setProxyUrlProvider('proxyUrl'),
      ],
    }).compile();

    controller = module.get<ProxyController>(ProxyController);
  });

  it('response should match definition', async () => {
    const take = 10;
    const response = await controller.list({ cursor: '', take: 10 }, '');

    expect(response.results).toBeInstanceOf(Array);
    expect(response.totalDocs).toBeNumber;

    if (response.results.length > take) {
      expect(response.next).toBeString;
      expect(response.hasNext).toBeBoolean;
      expect(response.hasPrev).toBeBoolean;
    } else {
      expect(response.next).toBeNull;
      expect(response.hasNext).toBeNull;
      expect(response.hasPrev).toBeNull;
    }
  });

  it('should return matching results when search is provided', async () => {
    const search = 'test';
    const response = await controller.list({ cursor: '', take: 10 }, search);

    if (response.results.length > 0) {
      expect(response.results[0]).toMatch(RegExp(`\w*${search}\w*`, 'gi'));
    }
  });
});
