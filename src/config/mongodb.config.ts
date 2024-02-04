import { DataSource } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

import Config from './envConfig';

export const MongoDbDataSource = new DataSource({
  url: Config.getSetting('mongoUrl'),
  type: 'mongodb',
  logging: true,
  entities: [__dirname + '/../database/entities/*.mongo.{js,ts}'],
} as MongoConnectionOptions);
