export type NODE_ENV = 'prod' | 'dev' | 'staging' | 'local-prod' | 'local';

export type user = {
  [key: string]: string;
};

export default interface IApplicationSettings {
  nodeEnv: NODE_ENV;
  port: string;
  pgUrl: string;
  mongoUrl: string;
  basicUser: string;
  basicPassword: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  proxyUrl: string;
}
