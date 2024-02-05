import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity('word')
export class Word {
  @Column()
  userId: string;

  @Column()
  word: string;

  @CreateDateColumn()
  added: Date;
}
