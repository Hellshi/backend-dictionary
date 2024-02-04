import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Request } from '@nestjs/common';

import { BasicAuth } from './decorators/basic-auth.decorator';
import { AuthService } from './auth.service';
import { ValidateLogin } from './decorators/validate-login.decorator';
import { LoginDto } from './dto/login.dto';

@ApiTags('App', 'Auth')
@Controller('app/auth')
export class AppAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ValidateLogin()
  @BasicAuth()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() req: any, @Body() dto: LoginDto) {
    return this.authService.login(req.user);
  }
}
