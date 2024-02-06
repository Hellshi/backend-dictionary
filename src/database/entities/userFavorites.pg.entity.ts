import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/common/baseEntity';
import { User } from './user.pg.entity';
import { Word } from './word.pg.entity';

@Entity('user_favorites')
export class UserFavorites extends BaseEntity<UserFavorites> {
  @Column()
  userId: string;

  @Column()
  wordId: string;

  @OneToMany(() => User, (user) => user.favorites)
  user: User[];

  @OneToMany(() => Word, (word) => word.favorites)
  word: Word[];
}
