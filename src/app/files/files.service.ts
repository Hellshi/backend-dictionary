import { Injectable } from '@nestjs/common';
import fs from 'fs';
import dictionary from './dictionary/words_dictionary.json';
import { AxiosAdapterService } from '../proxy/adapters/axiosAdapter/axiosAdapter.service';
@Injectable()
export class FilesService {
  constructor(private readonly axios: AxiosAdapterService) {}

  private fs = fs;
  private folder = 'chunks';

  private chuckFolderExists() {
    return this.fs.existsSync('chunks');
  }

  private transformData(data: string[]) {
    return data.map((word) => ({
      word: word.trim(),
    }));
  }

  private async writeFiles(data: string[], chunkSize = 10000) {
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);

      const formattedChunk = this.transformData(chunk);

      this.fs.writeFileSync(
        `${this.folder}/${i}-${i + chunkSize}.json`,
        JSON.stringify(formattedChunk),
      );
    }
  }

  async downloadDictionary() {
    try {
      const { data } = await this.axios.get<any>();
      this.fs.writeFileSync(
        'src/app/files/dictionary/words_dictionary.json',
        JSON.stringify(data),
      );
      console.log(
        `[MIGRATION]: Dictionary downloaded, proceeding with migration...`,
      );
    } catch (e) {
      console.log(
        `[MIGRATION]: Download dictionary failed with status code ${e.code}, migration will proceed with old dictionary stored in src/files/dictionary/words_dictionary.json feel free to modify the archive and try again`,
      );
    }
  }

  async writeChunks(chunkSize?: number) {
    if (!this.chuckFolderExists()) this.fs.mkdirSync(this.folder);
    return this.writeFiles(Object.keys(dictionary), chunkSize);
  }

  removeFile(file: string) {
    console.log(
      `[MIGRATION]: CHUNK ${file} MIGRATED WITH SUCCESS, REMOVING FILE...`,
    );
    return this.fs.unlinkSync(`${this.folder}/${file}`);
  }

  readDirSync(folder: string = this.folder) {
    return this.fs.readdirSync(folder);
  }

  async readChunks(file: string) {
    const data = this.fs.readFileSync(`${this.folder}/${file}`, {
      encoding: 'utf8',
    });

    return JSON.parse(data);
  }
}
