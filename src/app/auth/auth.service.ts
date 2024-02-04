import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/database/entities/user.pg.entity';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';

@Injectable()
export class AuthService {
  constructor(
    @Inject('repositoryCatalog')
    private readonly repositoryCatalog: RepositoryCatalog,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.repositoryCatalog.user.findOne({});

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.validatePassword(user, password);

    return user;
  }

  async login(user: User) {
    const { token } = await this.generateTokens(user);

    return {
      token,
      user: this.formatUserToReturn(user),
    };
  }

  private async validatePassword(user: User, password: string) {
    if (!user.comparePassword(password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private async generateTokens(user: User) {
    const token = await this.generateToken(user);

    return {
      token,
    };
  }

  private async generateToken(user: User) {
    const payload = this.formatUserPayload(user);

    return this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRATION,
      secret: process.env.JWT_SECRET,
    });
  }

  private formatUserToReturn(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  private formatUserPayload(user: User) {
    return {
      id: user.id,
    };
  }
}
