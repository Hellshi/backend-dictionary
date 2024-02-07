import IApplicationSettings from '../config/envConfig/interfaces/IApplicationSettings';

export const setProxyUrlProvider = (proxyUrl: keyof IApplicationSettings) => ({
  provide: 'AXIOS_PROXY_URL',
  useFactory: () => ({
    proxyUrl,
  }),
});
