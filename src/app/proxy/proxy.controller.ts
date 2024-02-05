import { Controller, Get, Param } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { JwtAuth } from '../auth/decorators/jwt-auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('proxy')
@Controller('entries')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('en/:word')
  @JwtAuth()
  async define(@Param('word') word: string) {
    return this.proxyService.define(word);
  }
}
