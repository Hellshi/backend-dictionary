import { Injectable } from '@nestjs/common';
import { AxiosAdapterService } from './adapters/axiosAdapter/axiosAdapter.service';
import { CacheProxyResponseDecorator } from 'src/common/decorators/cache-proxy.decorator';
import { Word } from 'src/database/entities/word.pg.entity';

@Injectable()
export class ProxyService {
  constructor(private readonly axios: AxiosAdapterService) {}

  @CacheProxyResponseDecorator()
  async define(word: string) {
    const {
      data: [response],
    } = await this.axios.get<Word[]>(word);
    return response;
  }
}
