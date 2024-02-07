import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import RepositoryCatalog from '../../database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from '../../providers/repository-catalog-provider.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [FilesModule],
  providers: [WordsService, GenericRepositoryProvider, RepositoryCatalog],
  exports: [WordsService],
})
export class WordsModule {}
