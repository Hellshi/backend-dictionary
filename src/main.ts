import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from './config/envConfig';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WordsService } from './app/words/words.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentConfig = new DocumentBuilder()
    .setTitle('Dictionary API')
    .setDescription(
      'Uma api pensada para tornar a busca em dicionários: fácil, rápida, escalável e resiliente.',
    )
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(Config.getSetting('port'));

  await app.get(WordsService).migrateDictionary();
}
bootstrap();
