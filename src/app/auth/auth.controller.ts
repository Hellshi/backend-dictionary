import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { BasicAuth } from './decorators/basic-auth.decorator';
import { JwtRefreshAuth } from './decorators/jwt-refresh-auth.decorator';
import { ValidateLogin } from './decorators/validate-login.decorator';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ValidateLogin()
  @BasicAuth()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req: any, @Body() dto: LoginDto) {
    return this.authService.login(req.user);
  }
}
