import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from 'src/providers/repository-catalog-provider.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  providers: [WordsService, GenericRepositoryProvider, RepositoryCatalog],
  exports: [WordsService],
})
export class WordsModule {}
