import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { GenericRepositoryProvider } from '../../providers/repository-catalog-provider.module';
import RepositoryCatalog from '../../database/repositories/common/repositoryCatalog';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, GenericRepositoryProvider, RepositoryCatalog],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
