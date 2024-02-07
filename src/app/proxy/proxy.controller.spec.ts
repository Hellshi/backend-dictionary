import { Test, TestingModule } from '@nestjs/testing';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import RepositoryCatalog from '../../database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from '../../providers/repository-catalog-provider.module';

describe('ProxyController', () => {
  let controller: ProxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProxyController],
      providers: [ProxyService, GenericRepositoryProvider, RepositoryCatalog],
    }).compile();

    controller = module.get<ProxyController>(ProxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
