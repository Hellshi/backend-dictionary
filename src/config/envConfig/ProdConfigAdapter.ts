import IApplicationConfigAdapter from './interfaces/IApplicationConfigAdapter';
import IApplicationSettings, {
  NODE_ENV,
} from './interfaces/IApplicationSettings';

export default class ProdConfigAdapter implements IApplicationConfigAdapter {
  settings!: IApplicationSettings;

  constructor() {
    this.config();
  }

  config(): void {
    this.settings = {
      nodeEnv: process.env.NODE_ENV as NODE_ENV,
      mongoUrl: process.env.MONGODB_URL as string,
      port: process.env.PORT as string,
      pgUrl: process.env.POSTGRES_URL as string,
      basicPassword: process.env.BASIC_PASSWORD as string,
      basicUser: process.env.BASIC_USER as string,
      jwtSecret: process.env.JWT_SECRET as string,
      jwtExpiresIn: process.env.JWT_EXPIRATION as string,
      proxyUrl: process.env.PROXY_URL as string,
      dictionaryListUrl: process.env.DICTIONARY_LIST_URL as string,
    };
  }

  getSetting(
    key: keyof IApplicationSettings,
  ): IApplicationSettings[keyof IApplicationSettings] {
    return this.settings[key];
  }

  getSettings(): IApplicationSettings {
    return this.settings;
  }
}
