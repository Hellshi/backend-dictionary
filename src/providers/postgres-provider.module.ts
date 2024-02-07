import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoDbDataSource } from '../config/mongodb.config';
import PostgresDataSource from '../config/postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      ...PostgresDataSource.options,
    }),
    TypeOrmModule.forRoot({
      ...MongoDbDataSource.options,
    }),
  ],
})
export class PostgresProviderModule {}
