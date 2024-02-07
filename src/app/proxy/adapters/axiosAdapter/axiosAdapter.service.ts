import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import Config from 'src/config/envConfig';
import { AxiosProxyUrl } from './types/axiosAdapter';
import { AxiosResponse } from 'axios';

@Injectable()
export class AxiosAdapterService {
  constructor(
    @Inject('AXIOS_PROXY_URL') private readonly proxyUrl: AxiosProxyUrl,
  ) {}

  private api = axios.create({
    baseURL: Config.getSetting(this.proxyUrl.proxyUrl),
  });

  async get<T>(path?: string): Promise<AxiosResponse<T>> {
    try {
      return this.api.get<T>(path);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.status;
      }
    }
  }
}
