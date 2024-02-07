import { UserHistory } from 'src/database/entities/userHistory.mongo.entity';
import BaseRepository from '../common/baseRepository';
import { MongoDbDataSource } from 'src/config/mongodb.config';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { pagination as paginationHelper } from '../common/helpers/pagination';
import { findUserHistoryByIdPaginated } from './agregations/findUserHistoryByIdPaginated';
import { countByUserId } from './agregations/countByUserId';
import { Pagination } from '../common/interfaces/baseRepository.interface';

export class UserHistoryRepository extends BaseRepository<UserHistory> {
  constructor() {
    super(MongoDbDataSource.getRepository(UserHistory), UserHistory);
  }

  private async getCount(userId: any) {
    const count = await this.repository.manager
      .getMongoRepository(UserHistory)
      .aggregate(countByUserId({ userId }))
      .toArray();
    return count[0].count;
  }

  async findHistoryPaginated({
    userId,
    pagination: { page = 1, take = 10 },
  }: {
    userId: string;
    pagination?: Pagination;
  }) {
    const skip = (+page - 1) * take;

    const count = await this.getCount(userId);

    const data = await this.repository.manager
      .getMongoRepository(UserHistory)
      .aggregate(findUserHistoryByIdPaginated({ skip, take, userId }))
      .toArray();

    return paginationHelper(data, page, take, count);
  }
}
