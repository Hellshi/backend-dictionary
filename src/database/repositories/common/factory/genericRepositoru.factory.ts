import PostgresDataSource from '../../../../config/postgres.config';
import { DataSource } from 'typeorm';
import RepositoryCatalog from '../repositoryCatalog';
import { MongoDbDataSource } from '../../../../config/mongodb.config';

export default async function repositoryCatalogFactory(): Promise<RepositoryCatalog> {
  let typeormDataSource: DataSource = PostgresDataSource;
  if (!PostgresDataSource.isInitialized) {
    typeormDataSource = await PostgresDataSource.initialize();
  }
  if (!MongoDbDataSource.isInitialized) {
    await MongoDbDataSource.initialize();
  }

  return new RepositoryCatalog(typeormDataSource.manager);
}
