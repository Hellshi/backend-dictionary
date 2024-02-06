import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from 'src/providers/repository-catalog-provider.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [FavoritesModule],
  controllers: [UserController],
  providers: [UserService, GenericRepositoryProvider, RepositoryCatalog],
})
export class UserModule {}
