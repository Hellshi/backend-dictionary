import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import RepositoryCatalog from '../../database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from '../../providers/repository-catalog-provider.module';

@Module({
  providers: [FavoritesService, GenericRepositoryProvider, RepositoryCatalog],
  exports: [FavoritesService],
})
export class FavoritesModule {}
