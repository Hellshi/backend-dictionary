import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import Config from 'src/config/envConfig';

@Injectable()
export class AxiosAdapterService {
  private api = axios.create({ baseURL: Config.getSetting('proxyUrl') });

  async get(path: string) {
    try {
      const { data } = await this.api.get(path);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data;
      }
    }
  }
}
