import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import Config from 'src/config/envConfig';
import { WordObject } from '../types/wordsApiResponse';

@Injectable()
export class AxiosAdapterService {
  private api = axios.create({ baseURL: Config.getSetting('proxyUrl') });

  async get(path: string): Promise<WordObject> {
    try {
      const {
        data: [word],
      } = await this.api.get<WordObject[]>(path);
      return word;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data;
      }
    }
  }
}
