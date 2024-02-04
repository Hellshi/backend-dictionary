import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity<Model> {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Model>) {
    Object.assign(this, partial);
  }
}
