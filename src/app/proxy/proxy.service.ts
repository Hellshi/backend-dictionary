import { HttpException, Injectable } from '@nestjs/common';
import { AxiosAdapterService } from './adapters/axiosAdapter/axiosAdapter.service';
import { CacheProxyResponseDecorator } from '../../common/decorators/cache-proxy.decorator';
import { Word } from '../../database/entities/word.pg.entity';
import { AxiosError } from 'axios';
import { ContextDecorator } from '../../common/decorators/register-history.decorator';
import { Response, Request } from 'express';

@Injectable()
export class ProxyService {
  constructor(private readonly axios: AxiosAdapterService) {}

  @CacheProxyResponseDecorator()
  async define(
    word: string,
    @ContextDecorator() _context: { request: Request; response: Response },
  ) {
    try {
      const {
        data: [response],
      } = await this.axios.get<Word[]>(word);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(
          error.response?.data?.message,
          error.response.status,
        );
      }
      throw error.message;
    }
  }
}
