import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import responseTime from 'response-time';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    responseTime()(req, res, next);
  }
}
