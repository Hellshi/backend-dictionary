import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from 'src/providers/repository-catalog-provider.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  controllers: [WordsController],
  providers: [WordsService, GenericRepositoryProvider, RepositoryCatalog],
})
export class WordsModule {}
