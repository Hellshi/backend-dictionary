import { Inject, Injectable } from '@nestjs/common';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';
import { FilesService } from '../files/files.service';
import { CursorPaginationDto } from 'src/database/repositories/common/dto/cursorPagination.dto';

@Injectable()
export class WordsService {
  constructor(
    @Inject('repositoryCatalog')
    private readonly repositoryCatalog: RepositoryCatalog,
    private readonly fileService: FilesService,
  ) {}

  registerUserHistory({ word, userId }: { word: string; userId: string }) {
    return this.repositoryCatalog.userHistory.insert({ word, userId });
  }

  async list({
    search = '',
    pagination,
  }: {
    search: string;
    pagination: CursorPaginationDto;
  }) {
    const results = await this.repositoryCatalog.word.list({
      search,
      pagination,
    });

    results.results = results.results.map(({ word }) => word);

    return results;
  }

  async migrateByChunks(files: string[]) {
    console.log('[MIGRATION]: Migrating chunks...');
    for (const file of files) {
      try {
        const chunk = await this.fileService.readChunks(file);

        await this.repositoryCatalog.word.migrateWords(chunk);

        console.log(
          `[MIGRATION]: chunk ${file} migrated with success. Removing file...`,
        );
        this.fileService.removeFile(file);
      } catch (error) {
        console.log(
          `[MIGRATION-ERROR]: chunk ${file} failed... ${error.message}`,
        );
        console.log(error);
      }
    }
  }

  async migrateDictionary() {
    try {
      const migrationMayStart =
        await this.repositoryCatalog.wordMigrationStatus.checkIfMigrationMayStart();

      if (!migrationMayStart) {
        await this.fileService.downloadDictionary();

        console.log('[MIGRATION]: Started');

        await this.repositoryCatalog.wordMigrationStatus.startMigration();

        console.log('[MIGRATION]: writing chunks...');
        this.fileService.writeChunks();

        const files = this.fileService.readDirSync();

        await this.migrateByChunks(files);

        await this.repositoryCatalog.wordMigrationStatus.finishMigration();

        console.log('[MIGRATION]: FINISHED! Enjoy your api with new words!');
      }
    } catch (error) {
      await this.repositoryCatalog.wordMigrationStatus.errorMigration();
      console.log(error);
    }
  }
}
