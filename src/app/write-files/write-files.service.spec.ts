import { Test, TestingModule } from '@nestjs/testing';
import { WriteFilesService } from './write-files.service';

describe('WriteFilesService', () => {
  let service: WriteFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WriteFilesService],
    }).compile();

    service = module.get<WriteFilesService>(WriteFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
