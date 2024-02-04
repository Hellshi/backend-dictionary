import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { WordsModule } from './app/words/words.module';
import { PostgresProviderModule } from './providers/postgres-provider.module';
import { MongoDbProviderModule } from './providers/mongodb-provider.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    WordsModule,
    PostgresProviderModule,
    MongoDbProviderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
