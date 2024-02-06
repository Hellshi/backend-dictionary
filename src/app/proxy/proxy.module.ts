import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { AxiosAdapterService } from './adapters/axiosAdapter/axiosAdapter.service';
import { FavoritesModule } from '../favorites/favorites.module';
import { CacheModule } from '../cache/cache.module';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from 'src/providers/repository-catalog-provider.module';

@Module({
  imports: [FavoritesModule, CacheModule],
  controllers: [ProxyController],
  providers: [ProxyService, AxiosAdapterService],
})
export class ProxyModule {}
