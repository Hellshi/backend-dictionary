import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor() {
    super(
      'Not found word, please, make sure your spell is correct',
      HttpStatus.NOT_FOUND,
    );
  }
}
