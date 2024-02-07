import { UserHistory } from 'src/database/entities/userHistory.mongo.entity';
import BaseRepository from '../common/baseRepository';
import { MongoDbDataSource } from 'src/config/mongodb.config';
import { findUserHistoryByIdPaginated } from './agregations/findUserHistoryByIdPaginated';
import { countByUserId } from './agregations/countByUserId';
import { CursorPagination } from '../common/interfaces/baseRepository.interface';
import { ObjectId } from 'mongodb';

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
    pagination: { cursor = null, take = 10 },
  }: {
    userId: string;
    pagination?: CursorPagination;
  }) {
    const count = await this.getCount(userId);

    const matchStage = cursor ? { _id: { $lt: new ObjectId(cursor) } } : {};

    const data = await this.repository.manager
      .getMongoRepository(UserHistory)
      .aggregate(findUserHistoryByIdPaginated({ take, userId, matchStage }))
      .toArray();

    const hasNext = data.length === take;
    const hasPrev = !!cursor;

    let previous = null;
    let next = null;

    if (data.length > 0) {
      next = data[data.length - 1]._id.toString();
      previous = data[0]._id.toString();
    }

    return {
      results: data.map(({ _id, ...rest }) => rest),
      totalDocs: count,
      previous,
      next: hasNext && next,
      hasNext,
      hasPrev,
    };
  }
}
