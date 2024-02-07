import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BasicStrategy } from './strategies/basic.strategy';
import { UserModule } from '../user/user.module';

import { LocalStrategy } from './strategies/local.strategy';
import Config from '../../config/envConfig';
import RepositoryCatalog from '../../database/repositories/common/repositoryCatalog';
import { GenericRepositoryProvider } from '../../providers/repository-catalog-provider.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: Config.getSetting('jwtSecret'),
      signOptions: { expiresIn: Config.getSetting('jwtExpiresIn') },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BasicStrategy,
    JwtStrategy,
    LocalStrategy,
    GenericRepositoryProvider,
    RepositoryCatalog,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
