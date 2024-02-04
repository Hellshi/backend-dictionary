import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('repositoryCatalog')
    private readonly repositoryCatalog: RepositoryCatalog,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const { id } = payload;

    const user = await this.repositoryCatalog.user.findOneOrFail(id);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { userId: user.id };
  }
}
