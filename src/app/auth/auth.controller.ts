import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { BasicAuth } from './decorators/basic-auth.decorator';
import { ValidateLogin } from './decorators/validate-login.decorator';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/types/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ValidateLogin()
  @BasicAuth()
  async login(@Request() req: any, @Body() _dto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @BasicAuth()
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }
}
