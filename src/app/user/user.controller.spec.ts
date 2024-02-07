import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GenericRepositoryProvider } from '../../providers/repository-catalog-provider.module';
import { FavoritesModule } from '../favorites/favorites.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FavoritesModule],
      controllers: [UserController],
      providers: [UserService, GenericRepositoryProvider],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
