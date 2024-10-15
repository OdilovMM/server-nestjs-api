/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
