import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/common/baseEntity';

@Entity('user_history')
export class UserHistory extends BaseEntity<UserHistory> {
  @Column()
  exampleColumn: string;
}
