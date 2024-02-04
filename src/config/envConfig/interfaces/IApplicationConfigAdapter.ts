import IApplicationSettings from './IApplicationSettings';

export default interface IApplicationConfigAdapter {
  settings: IApplicationSettings;
  config(): void;
  getSettings(): IApplicationSettings;
  getSetting(
    key: keyof IApplicationSettings,
  ): IApplicationSettings[keyof IApplicationSettings];
}
