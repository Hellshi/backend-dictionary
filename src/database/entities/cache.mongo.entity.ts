import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectId,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('cache')
export class Cache {
  @ObjectIdColumn()
  _id: ObjectId;

  @CreateDateColumn()
  @Index({ expireAfterSeconds: 3600 })
  createdAt: Date;

  @Column()
  key: string;

  @Column()
  value: string;
}
