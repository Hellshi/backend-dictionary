import repositoryCatalogFactory from '../database/repositories/common/factory/genericRepositoru.factory';
import RepositoryCatalog from '../database/repositories/common/repositoryCatalog';

export const GenericRepositoryProvider = {
  provide: 'repositoryCatalog',
  useFactory: () => {
    return repositoryCatalogFactory();
  },
  //inject: [RepositoryCatalog],
};
