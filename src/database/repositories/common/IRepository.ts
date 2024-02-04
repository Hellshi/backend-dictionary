/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOperator, QueryRunner, SelectQueryBuilder } from 'typeorm';

import { ObjectId } from 'mongodb';

export type Criteria<T> = {
  [P in keyof T]?: T[P];
};

export type Options<T> = {
  order?: { [P in keyof T]?: 'ASC' | 'DESC' };
  skip?: number;
  take?: number;
};

export default interface IRepository<T> {
  getById(object: Partial<T>): Promise<T | null>;

  getByIdWithDeleted(
    id: string | number,
    queryRunner?: QueryRunner,
  ): Promise<T | null>;

  getByIdOrFail(
    id: string | number | Uint8Array,
    queryRunner?: QueryRunner,
  ): Promise<T>;

  getAll(queryRunner?: QueryRunner): Promise<T[]>;

  insert(payload: Partial<T>, queryRunner?: QueryRunner): Promise<T>;

  update(
    id: string | number | Uint8Array | ObjectId,
    payload: Partial<T>,
    queryRunner?: QueryRunner,
  ): Promise<T>;

  updateOneBy(
    criteria: Criteria<T> | Criteria<T>[],
    payload: Partial<T>,
    queryRunner?: QueryRunner,
  ): Promise<T>;

  deleteWhereIn(
    ids: string[] | number[],
    queryRunner?: QueryRunner,
  ): Promise<void>;

  findOne<TValue>(
    criteria: Criteria<T> | Criteria<T>[],
    queryRunner?: QueryRunner,
  ): Promise<T | null>;

  findOneOrFail<TValue>(
    criteria: Criteria<T> | Criteria<T>[],
    queryRunner?: QueryRunner,
  ): Promise<T>;

  find(criteria: Criteria<T> | Criteria<T>[]): Promise<T[]>;

  findWithRelations(
    criteria: Criteria<T> | Criteria<T>[],
    relations: string[],
    queryRunner?: QueryRunner,
  ): Promise<T[]>;

  findOneWithRelations(
    criteria: Criteria<T> | Criteria<T>[],
    relations: string[],
    deleted?: boolean,
  ): Promise<T | null>;

  count(criteria: Criteria<T> | Criteria<T>[]): Promise<number>;
}
