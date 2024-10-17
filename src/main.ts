/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config({path: '.env'});
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    credentials: true
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.setGlobalPrefix('api/v1')
  await app.listen(process.env.PORT);
}
bootstrap();
