import {
  FindOneOptions,
  ObjectLiteral,
  ObjectType,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { Criteria } from './IRepository';

export default class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;
  protected objectType: new () => T;

  constructor(repository: Repository<T>, objectType: ObjectType<T>) {
    this.objectType = objectType as new () => T;
    this.repository = repository;
  }

  async getById(object: Partial<T>): Promise<T | null> {
    return this.repository.findOne({
      where: {
        id: object.id,
      },
    });
  }

  async getByIdWithDeleted(
    id: string | number,
    queryRunner?: QueryRunner,
  ): Promise<T | null> {
    if (queryRunner) {
      return queryRunner.manager
        .createQueryBuilder(this.objectType, 'entity')
        .withDeleted()
        .where('entity.id = :id', { id })
        .getOne();
    }
    return this.repository
      .createQueryBuilder()
      .withDeleted()
      .where('id = :id', { id })
      .getOne();
  }

  async getByIdOrFail(
    id: string | number,
    queryRunner?: QueryRunner,
  ): Promise<T> {
    if (queryRunner) {
      return queryRunner.manager.findOneOrFail(
        this.objectType,
        id as FindOneOptions<T>,
      );
    }
    return this.repository.findOneOrFail(id as FindOneOptions<T>);
  }

  async getAll(queryRunner?: QueryRunner): Promise<T[]> {
    if (queryRunner) {
      return queryRunner.manager.find(this.objectType);
    }
    return this.repository.find();
  }

  async insert(payload: Partial<T>, queryRunner?: QueryRunner): Promise<T> {
    if (queryRunner) {
      return queryRunner.manager.save(
        Object.assign(new this.objectType(), payload as T),
      );
    }
    return this.repository.manager.save(
      Object.assign(new this.objectType(), payload as T),
    );
  }

  async update(
    id: string | number | Uint8Array,
    payload: Partial<T>,
    queryRunner?: QueryRunner,
  ): Promise<T> {
    if (queryRunner) {
      const item = await queryRunner.manager.findOne(
        this.objectType,
        id as FindOneOptions<T>,
      );
      if (!item) {
        throw new Error(this.objectType.name);
      }

      return queryRunner.manager.save(
        Object.assign(new this.objectType(), item, payload),
      );
    }
    const item = await this.getById({ id } as unknown as Partial<T>);
    if (!item) {
      throw new Error(this.objectType.name);
    }

    return this.repository.manager.save(
      Object.assign(new this.objectType(), item, payload),
    );
  }

  async find(criteria: Criteria<T> | Criteria<T>[]): Promise<T[]> {
    return this.repository.find({ where: criteria });
  }

  async updateOneBy(
    criteria: Criteria<T> | Criteria<T>[],
    payload: Partial<T>,
    queryRunner?: QueryRunner,
  ): Promise<T> {
    if (queryRunner) {
      const item = await queryRunner.manager.findOne(this.objectType, {
        where: criteria,
      });

      return queryRunner.manager.save(
        Object.assign(new this.objectType(), item, payload),
      );
    }
    const item = await this.repository.findOne({ where: criteria });

    return this.repository.manager.save(
      Object.assign(new this.objectType(), item, payload),
    );
  }

  async findOne<TValue>(
    criteria: Criteria<T> | Criteria<T>[],
    queryRunner?: QueryRunner,
  ): Promise<T | null> {
    if (queryRunner) {
      return queryRunner.manager.findOne(this.objectType, { where: criteria });
    }
    return this.repository.findOne({
      where: criteria,
    });
  }

  async paginateByCursor({
    cursor,
    limit,
    query,
    queryAlias,
  }: {
    cursor?: string;
    limit: number;
    query: SelectQueryBuilder<T>;
    queryAlias: string;
  }): Promise<any> {
    if (cursor) {
      query.where(`${queryAlias}.id < :cursor`, { cursor });
    }

    const [results, totalDocs] = await Promise.all([
      query.orderBy(`${queryAlias}.id`, 'DESC').limit(limit).getRawMany(),
      this.repository.count(),
    ]);

    const hasNext = results.length === limit;
    const hasPrev = !!cursor;

    let previous = null;
    let next = null;

    if (results.length > 0) {
      next = results[results.length - 1].id;
      previous = results[0].id;
    }

    return {
      results: results.map(({ id, ...rest }) => rest),
      totalDocs,
      previous,
      next,
      hasNext,
      hasPrev,
    };
  }

  async findOneOrFail<TValue>(
    criteria: Criteria<T> | Criteria<T>[],
    queryRunner?: QueryRunner,
  ): Promise<T> {
    if (queryRunner) {
      return queryRunner.manager.findOneOrFail(this.objectType, {
        where: criteria,
      });
    }
    return this.repository.findOneOrFail({
      where: criteria,
    });
  }

  async findWithRelations(
    criteria: Criteria<T> | Criteria<T>[],
    relations: string[],
    queryRunner?: QueryRunner,
  ): Promise<T[]> {
    if (queryRunner) {
      return queryRunner.manager.find(this.objectType, {
        where: criteria,
        relations,
      });
    }
    return this.repository.find({
      where: criteria,
      relations,
    });
  }

  async findOneWithRelations(
    criteria: Criteria<T> | Criteria<T>[],
    relations: string[],
    deleted = false,
  ): Promise<T | null> {
    return this.repository.findOne({
      withDeleted: deleted,
      where: criteria,
      relations,
    });
  }

  count(criteria: Criteria<T> | Criteria<T>[]): Promise<number> {
    return this.repository.count({
      where: criteria,
    });
  }
}
