import { Injectable } from '@nestjs/common';
import { AxiosAdapterService } from './adapters/axiosAdapter/axiosAdapter.service';
import { CacheProxyResponseDecorator } from 'src/common/decorators/cache-proxy.decorator';

@Injectable()
export class ProxyService {
  constructor(private readonly axios: AxiosAdapterService) {}

  @CacheProxyResponseDecorator()
  async define(word: string) {
    return this.axios.get(word);
  }
}
