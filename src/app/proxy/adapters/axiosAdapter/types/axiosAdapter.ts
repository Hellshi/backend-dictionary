import IApplicationSettings from '../../../../../config/envConfig/interfaces/IApplicationSettings';

export interface AxiosProxyUrl {
  proxyUrl: keyof IApplicationSettings;
}
