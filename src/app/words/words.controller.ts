import { Controller, Param, Post } from '@nestjs/common';
import { WordsService } from './words.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Words')
@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post('/:word')
  registerWord(@Param('word') word: string) {
    return this.wordsService.registerWord({ word });
  }
}
