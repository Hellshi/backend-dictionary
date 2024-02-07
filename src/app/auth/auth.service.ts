import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../database/entities/user.pg.entity';
import RepositoryCatalog from '../../database/repositories/common/repositoryCatalog';
import { CreateUserDto } from '../user/types/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('repositoryCatalog')
    private readonly repositoryCatalog: RepositoryCatalog,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.repositoryCatalog.user.findOne({ email });

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
      name: user.name,
      id: user.id,
    };
  }

  async signup(dto: CreateUserDto) {
    const user = await this.repositoryCatalog.user.insert(dto);
    return this.login(user);
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

  private formatUserPayload(user: User) {
    return {
      id: user.id,
    };
  }
}
