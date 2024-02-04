import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';
import { CreateUserDto } from './types/create-user.dto';
import { CatchAll } from '@greguintow/catch-decorator';

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
}
