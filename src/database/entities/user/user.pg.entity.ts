import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/database/common/baseEntity';

@Entity('user')
export class User extends BaseEntity<User> {
  @Column()
  exampleColumn: string;
}
