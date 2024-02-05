import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';
import { CreateUserDto } from './types/create-user.dto';
import { CatchAll } from '@greguintow/catch-decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('repositoryCatalog')
    private readonly repositoryCatalog: RepositoryCatalog,
  ) {}

  @CatchAll(() => {
    throw new BadRequestException('duplicated email');
  })
  async createUser(dto: CreateUserDto) {
    const user = await this.repositoryCatalog.user.insert(dto);

    return user;
  }

  async getUserHistory({
    userId,
    pagination,
  }: {
    userId: string;
    pagination: PaginationDto;
  }) {
    return this.repositoryCatalog.userHistory.findHistoryPaginated({
      pagination,
      userId,
    });
  }

  async getUserProfile(userId: string) {
    return this.repositoryCatalog.user.getUserProfile(userId);
  }
}
