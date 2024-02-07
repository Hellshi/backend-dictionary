import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import RepositoryCatalog from '../../database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from '../../providers/repository-catalog-provider.module';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        GenericRepositoryProvider,
        RepositoryCatalog,
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
