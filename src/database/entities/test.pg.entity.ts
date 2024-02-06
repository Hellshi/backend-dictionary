import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/common/baseEntity';

@Entity('test')
export class Test extends BaseEntity<Test> {
  @Column()
  exampleColumn: string;
}
