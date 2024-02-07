import IApplicationSettings from 'src/config/envConfig/interfaces/IApplicationSettings';

export interface AxiosProxyUrl {
  proxyUrl: keyof IApplicationSettings;
}
