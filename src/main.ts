import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ResponseTransformInterceptor } from './common/interceptors/respone-transform.interceptor';
import { createDocument } from './common/swagger/swagger';
const PORT = process.env.PORT || 3000;
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '20mb',
      extended: true,
      parameterLimit: 1000,
    }),
  );
  app.enableCors();
  
  SwaggerModule.setup('/docs/v1', app, createDocument(app));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseTransformInterceptor())
  await app.listen(PORT);

}
bootstrap();
