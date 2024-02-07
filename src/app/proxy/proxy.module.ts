import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { AxiosAdapterService } from './adapters/axiosAdapter/axiosAdapter.service';
import { FavoritesModule } from '../favorites/favorites.module';
import { CacheModule } from '../cache/cache.module';
import { WordsModule } from '../words/words.module';
import { setProxyUrlProvider } from '../../providers/proxy-url-injection-provider';
@Module({
  imports: [FavoritesModule, CacheModule, WordsModule],
  controllers: [ProxyController],
  providers: [
    ProxyService,
    AxiosAdapterService,
    setProxyUrlProvider('proxyUrl'),
  ],
})
export class ProxyModule {}
