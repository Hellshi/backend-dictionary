import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import Config from 'src/config/envConfig';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  validate = async (
    _request: Request,
    username: string,
    password: string,
  ): Promise<boolean> => {
    if (
      Config.getSetting('basicUser') === username &&
      Config.getSetting('basicPassword') === password
    ) {
      return true;
    }
    throw new UnauthorizedException('Invalid credentials');
  };

  constructor() {
    super({
      passReqToCallback: true,
    });
  }
}
