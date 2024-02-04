import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from './config/envConfig';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentConfig = new DocumentBuilder()
    .setTitle('Dictionary API')
    .setDescription('Test api')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .addBearerAuth(undefined, 'refreshBearerAuth')
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(Config.getSetting('port'));
}
bootstrap();
