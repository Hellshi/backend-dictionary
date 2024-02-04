import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBasicAuth } from '@nestjs/swagger';

import { BasicGuard } from '../guards/basic.guard';

export function BasicAuth() {
  return applyDecorators(UseGuards(BasicGuard), ApiBasicAuth());
}
