import DevConfigAdapter from './DevConfigAdapter';
import IApplicationConfigAdapter from './interfaces/IApplicationConfigAdapter';
import ProdConfigAdapter from './ProdConfigAdapter';

let instance: IApplicationConfigAdapter | null = null;

const Config = (() => {
  if (!instance) {
    switch (process.env.NODE_ENV) {
      case 'prod':
        instance = new ProdConfigAdapter();
        break;
      default:
        instance = new DevConfigAdapter();
        break;
    }
  }
  return instance;
})();

export default Config;

export const isLocalEnvironment = ['development', 'staging'].includes(
  Config.getSetting('nodeEnv').toString(),
);

export const isProductionEnvironment = ['production'].includes(
  Config.getSetting('nodeEnv').toString(),
);
