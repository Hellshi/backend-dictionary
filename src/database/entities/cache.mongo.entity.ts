import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

@Entity('cache')
export class Cache {
  @ObjectIdColumn()
  _id: ObjectId;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  key: string;

  @Column()
  value: string;
}
