import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { AxiosAdapterService } from '../proxy/adapters/axiosAdapter/axiosAdapter.service';
import { setProxyUrlProvider } from 'src/providers/proxy-url-injection-provider';

@Module({
  providers: [
    FilesService,
    AxiosAdapterService,
    setProxyUrlProvider('dictionaryListUrl'),
  ],
  exports: [FilesService],
})
export class FilesModule {}
