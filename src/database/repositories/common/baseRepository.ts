/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import {
  EntityManager,
  FindOneOptions,
  FindOperator,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  ObjectLiteral,
  ObjectType,
  QueryRunner,
  Repository,
} from 'typeorm'


import IRepository, { Criteria, Options } from './IRepository'

export default class BaseRepository<T extends ObjectLiteral> implements IRepository<T> {
  protected repository: Repository<T>
  protected objectType: new () => T

  constructor(repository: Repository<T>, objectType: ObjectType<T>) {
    this.objectType = objectType as new () => T
    this.repository = repository
  }
  /**
   * This method will release the query runner at the end of the query execution
   */

  async getById(
    object: Partial<T>,
  ): Promise<T | null> {
    return this.repository.findOne({ where: {
      id: object.id
    } })
  }

  async getByIdWithDeleted(
    id: string | number,
    queryRunner?: QueryRunner
  ): Promise<T | null> {
    if (queryRunner) {
      return queryRunner.manager
        .createQueryBuilder(this.objectType, 'entity')
        .withDeleted()
        .where('entity.id = :id', { id })
        .getOne()
    }
    return this.repository
        .createQueryBuilder()
        .withDeleted()
        .where('id = :id', { id })
        .getOne()
    
  }

  async getByIdOrFail(
    id: string | number,
    queryRunner?: QueryRunner
  ): Promise<T> {
    if (queryRunner) {
      return queryRunner.manager.findOneOrFail(this.objectType, id as FindOneOptions<T>)
    }
    return this.repository.findOneOrFail(id as FindOneOptions<T>)
  }


  async getAll(queryRunner?: QueryRunner): Promise<T[]> {
    if (queryRunner) {
      return queryRunner.manager.find(this.objectType)
    }
    return this.repository.find()
  }

  async insert(payload: Partial<T>, queryRunner?: QueryRunner): Promise<T> {
    if (queryRunner) {
      return queryRunner.manager.save(
        Object.assign(new this.objectType(), payload as T)
      )
    }
    return this.repository.manager.save(
        Object.assign(new this.objectType(), payload as T)
    )
  }

  async update(
    id: string | number| Uint8Array,
    payload: Partial<T>,
    queryRunner?: QueryRunner
  ): Promise<T> {
    if (queryRunner) {
      const item = await queryRunner.manager.findOne(this.objectType, id as FindOneOptions<T>)
      if (!item) {
         throw new Error(this.objectType.name)
      }

      return queryRunner.manager.save(
        Object.assign(new this.objectType(), item, payload)
      )
    }
    const item = await this.getById({ id } as unknown as Partial<T>)
    if (!item) {
      throw new Error(this.objectType.name)
    }

    return this.repository.manager.save(
        Object.assign(new this.objectType(), item, payload)
    )
  }


  async find(
    criteria: Criteria<T> | Criteria<T>[],
  ): Promise<T[]> {
    return this.repository.find({ where: criteria })
  }


  async updateOneBy(
    criteria: Criteria<T> | Criteria<T>[],
    payload: Partial<T>,
    queryRunner?: QueryRunner
  ): Promise<T> {
    if (queryRunner) {
      const item = await queryRunner.manager.findOne(this.objectType, {
        where: criteria
      })

      return queryRunner.manager.save(
        Object.assign(new this.objectType(), item, payload)
      )
    }
    const item = await this.repository.findOne({ where: criteria })

    return this.repository.manager.save(
        Object.assign(new this.objectType(), item, payload)
    )
  }


  async deleteWhereIn(
    ids: string[] | number[],
    queryRunner?: QueryRunner
  ): Promise<void> {
    if (queryRunner) {
      await queryRunner.manager.delete(this.objectType, ids)
      return
    }
    await this.repository.delete(ids)
  }

  async findOne<TValue>(
    criteria: Criteria<T> | Criteria<T>[],
    queryRunner?: QueryRunner
  ): Promise<T | null> {
    if (queryRunner) {
      return queryRunner.manager.findOne(this.objectType, { where: criteria })
    }
    return this.repository.findOne({
        where: criteria
      })
  }

  async findOneOrFail<TValue>(
    criteria: Criteria<T> | Criteria<T>[],
    queryRunner?: QueryRunner
  ): Promise<T> {
    if (queryRunner) {
      return queryRunner.manager.findOneOrFail(this.objectType, {
        where: criteria
      })
    }
    return this.repository.findOneOrFail({
        where: criteria
      })
  }

  async findWithRelations(
    criteria: Criteria<T> | Criteria<T>[],
    relations: string[],
    queryRunner?: QueryRunner
  ): Promise<T[]> {
    if (queryRunner) {
      return queryRunner.manager.find(this.objectType, {
        where: criteria,
        relations
      })
    }
    return this.repository.find({
      where: criteria,
      relations
    })
  }

  async findOneWithRelations(
    criteria: Criteria<T> | Criteria<T>[],
    relations: string[],
    deleted = false
  ): Promise<T | null> {
    return this.repository.findOne({
        withDeleted: deleted,
        where: criteria,
        relations
      })
  }

  count(criteria: Criteria<T> | Criteria<T>[]): Promise<number> {
    return this.repository.count({
        where: criteria
      })
  }

}
