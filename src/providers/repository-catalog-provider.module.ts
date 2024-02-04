import repositoryCatalogFactory from 'src/database/repositories/common/factory/genericRepositoru.factory';
import RepositoryCatalog from 'src/database/repositories/common/repositoryCatalog';

export const GenericRepositoryProvider = {
  provide: 'repositoryCatalog',
  useFactory: () => {
    return repositoryCatalogFactory();
  },
  inject: [RepositoryCatalog],
};
