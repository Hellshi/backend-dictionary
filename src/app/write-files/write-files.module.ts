import { Module } from '@nestjs/common';
import { WriteFilesService } from './write-files.service';

@Module({
  providers: [WriteFilesService],
})
export class WriteFilesModule {}
