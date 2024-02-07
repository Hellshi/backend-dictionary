import { Test, TestingModule } from '@nestjs/testing';
import { ProxyService } from './proxy.service';
import RepositoryCatalog from '../../database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from '../../providers/repository-catalog-provider.module';

describe('ProxyService', () => {
  let service: ProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProxyService, GenericRepositoryProvider, RepositoryCatalog],
    }).compile();

    service = module.get<ProxyService>(ProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
