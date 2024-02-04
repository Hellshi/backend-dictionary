import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { WordsModule } from './app/words/words.module';

@Module({
  imports: [UserModule, WordsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
