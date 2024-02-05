import { Module } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
import { AxiosAdapterService } from './adapters/axiosAdapter/axiosAdapter.service';

@Module({
  controllers: [ProxyController],
  providers: [ProxyService, AxiosAdapterService],
})
export class ProxyModule {}
