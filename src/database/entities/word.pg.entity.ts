import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/common/baseEntity';

@Entity('word')
export class Word extends BaseEntity<Word> {
  @Column()
  word: string;
}
