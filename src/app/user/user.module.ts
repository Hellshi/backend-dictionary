import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from 'src/providers/repository-catalog-provider.module';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, GenericRepositoryProvider, RepositoryCatalog],
})
export class UserModule {}
