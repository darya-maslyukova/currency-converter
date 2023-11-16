import { LoadRatesOptions } from "@app/interfaces/load-rates-options.interface";


export class LoadRates {
  static readonly type = '[rates] load';

  constructor(public options: LoadRatesOptions) {
  }
}
