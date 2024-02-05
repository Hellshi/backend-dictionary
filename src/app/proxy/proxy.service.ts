import { Injectable } from '@nestjs/common';
import { AxiosAdapterService } from './adapters/axiosAdapter/axiosAdapter.service';

@Injectable()
export class ProxyService {
  constructor(private readonly axios: AxiosAdapterService) {}

  async define(word: string) {
    return this.axios.get(word);
  }
}
