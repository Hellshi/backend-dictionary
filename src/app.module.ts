import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { WordsModule } from './app/words/words.module';
import { PostgresProviderModule } from './providers/postgres-provider.module';
import { MongoDbProviderModule } from './providers/mongodb-provider.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GenericRepositoryProvider } from './providers/repository-catalog-provider.module';
import RepositoryCatalog from './database/repositories/common/repositoryCatalog';
import { AuthModule } from './app/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ProxyModule } from './app/proxy/proxy.module';
import { FavoritesModule } from './app/favorites/favorites.module';
import { CacheModule } from './app/cache/cache.module';
import { FilesModule } from './app/files/files.module';
import Config from './config/envConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: Config.getSetting('jwtSecret'),
      signOptions: { expiresIn: Config.getSetting('jwtExpiresIn') },
    }),
    UserModule,
    WordsModule,
    AuthModule,
    PostgresProviderModule,
    MongoDbProviderModule,
    PassportModule,
    ProxyModule,
    FavoritesModule,
    CacheModule,
    FilesModule,
  ],
  controllers: [],
  providers: [GenericRepositoryProvider, RepositoryCatalog],
})
export class AppModule {}
