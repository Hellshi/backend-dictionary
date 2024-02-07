import PostgresDataSource from '../../../config/postgres.config';
import { Word } from '../../../database/entities/word.pg.entity';
import BaseRepository from '../common/baseRepository';
import { CursorPagination } from '../common/interfaces/baseRepository.interface';

export class WordRepository extends BaseRepository<Word> {
  constructor() {
    super(PostgresDataSource.getRepository(Word), Word);
  }

  readonly queryAlias = 'word';

  async migrateWords(chunk: Word[]) {
    return this.repository
      .createQueryBuilder(`${this.queryAlias}`)
      .insert()
      .values(chunk)
      .execute();
  }

  async list({
    search,
    pagination: { cursor = null, take = 10 },
  }: {
    search: string;
    pagination: CursorPagination;
  }) {
    const query = this.repository
      .createQueryBuilder(`${this.queryAlias}`)
      .select([
        `${this.queryAlias}.word AS word`,
        `${this.queryAlias}.id AS id`,
      ])
      .where(`${this.queryAlias}.word ILIKE :search`, {
        search: `%${search}%`,
      });

    return this.paginateByCursor({
      query,
      queryAlias: this.queryAlias,
      cursor,
      limit: take,
    });
  }
}
