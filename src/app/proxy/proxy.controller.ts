import { Controller, Get, Param } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { JwtAuth } from '../auth/decorators/jwt-auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
  ContextDecorator,
  RegisterHistoryDecorator,
} from 'src/common/decorators/register-history.decorator';

@ApiTags('proxy')
@Controller('entries')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('en/:word')
  @JwtAuth()
  @RegisterHistoryDecorator()
  async define(
    @Param('word') word: string,
    @ContextDecorator() _context: { request: Request },
  ) {
    return this.proxyService.define(word);
  }
}
