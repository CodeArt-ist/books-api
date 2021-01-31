import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as config from 'config'
import {logger} from "./logger.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bodyParser: true
  });

  await app.use(logger)

  const swaggerConfig = new DocumentBuilder()
      .setTitle('Books Api')
      .setDescription('The Books API is very scalable project for book lovers. You make review the book and share with friends')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const serverConfig = config.get('server')

  await app.listen(serverConfig.port);
}

bootstrap();
