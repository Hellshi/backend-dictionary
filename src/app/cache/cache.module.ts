import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import RepositoryCatalog from '../../database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from '../../providers/repository-catalog-provider.module';
import { MongoAdapterCacheService } from './adapters/mongoAdapter/mongoAdapterCache.service';

@Module({
  providers: [
    CacheService,
    MongoAdapterCacheService,
    GenericRepositoryProvider,
    RepositoryCatalog,
  ],
  exports: [CacheService, MongoAdapterCacheService],
})
export class CacheModule {}
