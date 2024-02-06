import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/common/baseEntity';

@Entity('word_migration_status')
export class WordMigrationStatus extends BaseEntity<WordMigrationStatus> {
  @Column()
  status: string;
}
