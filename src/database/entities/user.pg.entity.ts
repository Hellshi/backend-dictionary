import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/common/baseEntity';
import { comparePassword, hashPassword } from '../../common/utils/hashPassword';
import { UserFavorites } from './userFavorites.pg.entity';

@Entity('user')
export class User extends BaseEntity<User> {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => UserFavorites, (userFavorites) => userFavorites.user)
  favorites: UserFavorites[];

  @BeforeInsert()
  hashPassword(): void {
    this.password = hashPassword(this.password);
  }

  comparePassword(attempt: string): boolean {
    return comparePassword({ attempt, password: this.password });
  }

  @BeforeUpdate()
  hash(): void {
    this.hashPassword();
  }
}
