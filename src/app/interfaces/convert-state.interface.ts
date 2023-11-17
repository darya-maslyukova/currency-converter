import { LoadRatesOptions } from "@app/interfaces/load-rates-options.interface";

export interface ConvertStateInterface {
  date: string;
  query: LoadRatesOptions;
  result: number | string
}
