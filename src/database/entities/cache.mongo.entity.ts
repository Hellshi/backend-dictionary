import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity('cache')
export class Cache {
  @CreateDateColumn()
  @Index({ expireAfterSeconds: 3600 })
  createdAt: Date;

  @Column()
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;
}
