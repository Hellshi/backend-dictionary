import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../database/common/baseEntity';
import { User } from './user.pg.entity';
import { Word } from './word.pg.entity';

@Entity('user_favorites')
export class UserFavorites extends BaseEntity<UserFavorites> {
  @Column()
  userId: string;

  @Column()
  wordId: string;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'userId' })
  user: User[];

  @ManyToOne(() => Word, (word) => word.favorites)
  @JoinColumn({ name: 'wordId' })
  word: Word[];
}
