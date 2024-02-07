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
    const response = await controller.list({ cursor: '', take: 10 }, '');

    expect(response.results).toBeInstanceOf(Array);
    expect(response.totalDocs).toBeNumber;
    expect(response.next).toBeString;
    expect(response.hasNext).toBeBoolean;
    expect(response.hasPrev).toBeBoolean;
  });

  it('response should match definition', async () => {
    const response = await controller.list({ cursor: '', take: -1 }, '');

    expect(response.statusCode).toBe(400);
    expect(response.totalDocs).toBeNumber;
    expect(response.next).toBeString;
    expect(response.hasNext).toBeBoolean;
    expect(response.hasPrev).toBeBoolean;
  });
});
