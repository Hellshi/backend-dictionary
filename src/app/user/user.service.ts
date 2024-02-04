import { Inject, Injectable } from '@nestjs/common';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';

@Injectable()
export class UserService {
  constructor(
    @Inject('repositoryCatalog')
    private readonly exampleInstance: RepositoryCatalog,
  ) {}

  async test() {
    return this.exampleInstance.user.findOne({ id: 1 });
  }
}
