import { Inject, Injectable } from '@nestjs/common';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';
import { FilesService } from '../files/files.service';
import { MigrationStatus } from 'src/database/repositories/wordMigrationStatus/types/migrationStatus.enum';

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

  registerWord({ word }: { word: string }) {
    return this.repositoryCatalog.word.insert({ word });
  }

  async migrateByChunks(files: string[]) {
    for (const file of files) {
      try {
        const chunk = this.fileService.readChunks(file);

        await this.repositoryCatalog.word.migrateWords(chunk);

        this.fileService.removeFile(file);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async migrateDictionary() {
    try {
      const migrationMayStart =
        await this.repositoryCatalog.wordMigrationStatus.checkIfMigrationMayStart();

      if (!migrationMayStart) {
        await this.repositoryCatalog.wordMigrationStatus.startMigration();

        this.fileService.writeChunks();

        const files = this.fileService.readDirSync();

        await this.migrateByChunks(files);

        await this.repositoryCatalog.wordMigrationStatus.finishMigration();
      }
    } catch (error) {
      await this.repositoryCatalog.wordMigrationStatus.errorMigration();
      console.log(error);
    }
  }
}
