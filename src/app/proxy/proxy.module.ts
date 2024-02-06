import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { AxiosAdapterService } from './adapters/axiosAdapter/axiosAdapter.service';
import { FavoritesModule } from '../favorites/favorites.module';
import { CacheModule } from '../cache/cache.module';
@Module({
  imports: [FavoritesModule, CacheModule],
  controllers: [ProxyController],
  providers: [ProxyService, AxiosAdapterService],
})
export class ProxyModule {}
