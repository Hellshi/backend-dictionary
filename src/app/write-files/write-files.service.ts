import { Injectable } from '@nestjs/common';
import fs from 'fs';
import dictionary from './dictionary/words_dictionary.json';
@Injectable()
export class WriteFilesService {
  private fs = fs;

  async writeFiles(data: string[], chunkSize = 1000) {
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      this.fs.writeFileSync(
        `chunks/${i}-${i + chunkSize}.json`,
        JSON.stringify(chunk),
      );
    }
  }
  async writeChunks() {
    if (!this.fs.existsSync('chunks')) this.fs.mkdirSync('chunks');
    return this.writeFiles(Object.keys(dictionary), 10000);
  }
}
