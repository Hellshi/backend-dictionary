import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from './config/envConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Config.getSetting('port'));
}
bootstrap();
