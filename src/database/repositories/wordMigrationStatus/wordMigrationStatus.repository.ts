import PostgresDataSource from 'src/config/postgres.config';
import { WordMigrationStatus } from 'src/database/entities/wordMigrationStatus.pg.entity';
import BaseRepository from '../common/baseRepository';
import { MigrationStatus } from './types/migrationStatus.enum';

export class WordMigrationStatusRepository extends BaseRepository<WordMigrationStatus> {
  constructor() {
    super(
      PostgresDataSource.getRepository(WordMigrationStatus),
      WordMigrationStatus,
    );
  }

  async checkIfMigrationMayStart() {
    const migration = await this.repository.findOne({
      where: {
        status: MigrationStatus.IN_PROGRESS || MigrationStatus.COMPLETED,
      },
    });

    return !!migration;
  }

  async startMigration() {
    return this.insert({
      status: MigrationStatus.IN_PROGRESS,
    });
  }

  async finishMigration() {
    return this.insert({
      status: MigrationStatus.COMPLETED,
    });
  }

  async errorMigration() {
    return this.insert({
      status: MigrationStatus.ERROR,
    });
  }
}
