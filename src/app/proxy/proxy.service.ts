import { Injectable } from '@nestjs/common';
import { AxiosAdapterService } from './adapters/axiosAdapter/axiosAdapter.service';
import { CacheProxyResponseDecorator } from 'src/common/decorators/cache-proxy.decorator';
import { Word } from 'src/database/entities/word.pg.entity';
import { NotFoundError } from 'src/common/errors/notFound.error';

@Injectable()
export class ProxyService {
  constructor(private readonly axios: AxiosAdapterService) {}

  @CacheProxyResponseDecorator()
  async define(word: string) {
    try {
      const {
        data: [response],
      } = await this.axios.get<Word[]>(word);
      return response;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundError();
      }
      throw error.message;
    }
  }
}
