import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import Config, { isLocalEnvironment } from './envConfig';

const PostgresDataSource = new DataSource({
  type: 'postgres',
  url: Config.getSetting('pgUrl'),
  logging: false,
  /* synchronize: isLocalEnvironment, */
  entities: [__dirname + '/../database/entities/*.pg.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: [__dirname + '/../database/migrations'],
  },
  poolSize: 6,
} as PostgresConnectionOptions);

export default PostgresDataSource;
