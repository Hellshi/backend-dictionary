import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import Config from './envConfig';

const PostgresDataSource = new DataSource({
  type: 'postgres',
  url: Config.getSetting('pgUrl'),
  logging: false /* isLocalEnvironment */,
  synchronize: false,
  entities: [__dirname + '/../database/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: [__dirname + '/../database/migrations'],
  },
  poolSize: 6,
} as PostgresConnectionOptions);

export default PostgresDataSource;
