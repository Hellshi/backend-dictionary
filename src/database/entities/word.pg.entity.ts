import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/common/baseEntity';
import { UserFavorites } from './userFavorites.pg.entity';

@Entity('word')
export class Word extends BaseEntity<Word> {
  @Column({ unique: true })
  word: string;

  @ManyToOne(() => UserFavorites, (userFavorites) => userFavorites.word)
  favorites?: UserFavorites[];
}
