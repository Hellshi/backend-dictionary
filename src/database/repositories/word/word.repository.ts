import PostgresDataSource from 'src/config/postgres.config';
import { Word } from 'src/database/entities/word.pg.entity';
import BaseRepository from '../common/baseRepository';

export class WordRepository
  extends BaseRepository<Word>
{
  constructor() {
    super(PostgresDataSource.getRepository(Word), Word);
  }
}
