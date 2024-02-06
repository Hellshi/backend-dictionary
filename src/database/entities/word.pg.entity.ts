import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/common/baseEntity';
import { UserFavorites } from './userFavorites.pg.entity';

@Entity('word')
export class Word extends BaseEntity<Word> {
  @Column({ unique: true })
  word: string;

  @OneToMany(() => UserFavorites, (userFavorites) => userFavorites.word)
  favorites?: UserFavorites[];
}
