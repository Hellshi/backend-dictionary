import { UserHistory } from 'src/database/entities/userHistory.mongo.entity';
import BaseRepository from '../common/baseRepository';
import { MongoDbDataSource } from 'src/config/mongodb.config';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { pagination } from '../common/helpers/pagination';

export class UserHistoryRepository extends BaseRepository<UserHistory> {
  constructor() {
    super(MongoDbDataSource.getRepository(UserHistory), UserHistory);
  }

  async findHistoryPaginated({
    userId,
    pagination: { page, take },
  }: {
    userId: string;
    pagination: PaginationDto;
  }) {
    const [data, count] = await this.repository.manager
      .getMongoRepository(UserHistory)
      .findAndCount({
        where: { userId },
        skip: (page - 1) * take,
        take: +take,
      });

    return pagination(data, page, take, count);
  }
}
