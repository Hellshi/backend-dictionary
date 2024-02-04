import dotenv from 'dotenv';

import ProdConfigAdapter from './ProdConfigAdapter';

export default class DevConfigAdapter extends ProdConfigAdapter {
  config(): void {
    dotenv.config();
    super.config();
  }
}
