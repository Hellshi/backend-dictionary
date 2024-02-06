/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityManager } from 'typeorm';

import IRepositoryCatalog from './interfaces/repositoryCatalog';
import PostgresDataSource from 'src/config/postgres.config';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { WordRepository } from '../word/word.repository';
import { UserHistoryRepository } from '../userHistory/userHistory.repository';
import { UserFavoritesRepository } from '../userFavorites/userFavorites.repository';
//PLOP IMPORT REPOSITORY

@Injectable()
export default class RepositoryCatalog implements IRepositoryCatalog {
  private entityManager: EntityManager;

  private cache: Map<string, any>;

  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
    this.cache = new Map<string, any>();
  }

  private refreshQueryRunner(): void {
    const queryRunner = PostgresDataSource.createQueryRunner();
    this.entityManager = queryRunner.manager;
  }

  private getRepo<TRepo>(name: string, factory: () => TRepo): TRepo {
    const cached = this.cache.get(name);

    if (cached && !this.entityManager.queryRunner?.isReleased) {
      return cached as TRepo;
    }

    if (!this.entityManager.queryRunner?.isTransactionActive)
      this.refreshQueryRunner();

    const repoInstance = factory();

    this.cache.set(name, repoInstance);

    return repoInstance;
  }

  async startTransaction(): Promise<void> {
    if (!this.entityManager?.queryRunner) {
      console.error('aaa');
      return;
      //throw Error("Unable to start transaction!");
    }

    await this.entityManager.queryRunner.startTransaction();
  }

  async commit(): Promise<void> {
    await this.entityManager.queryRunner?.commitTransaction();
  }

  async rollback(): Promise<void> {
    await this.entityManager.queryRunner?.rollbackTransaction();
  }

  get user(): UserRepository {
    return this.getRepo<UserRepository>('user', () => new UserRepository());
  }
  get word(): WordRepository {
    return this.getRepo<WordRepository>('word', () => new WordRepository());
  }
  get userHistory(): UserHistoryRepository {
    return this.getRepo<UserHistoryRepository>(
      'user-history',
      () => new UserHistoryRepository(),
    );
  }
  get userFavorites(): UserFavoritesRepository {
    return this.getRepo<UserFavoritesRepository>(
      'userFavorites',
      () => new UserFavoritesRepository(),
    );
  }
  //PLOP INSERT REPOSITORY
}
