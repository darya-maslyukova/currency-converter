import { LoadRatesOptions } from "@app/interfaces/load-rates-options.interface";

export interface ConvertResponse {
  date: string;
  info: {
    rate: number;
    timestamp: number
  },
  query: LoadRatesOptions
  result: number,
  success: boolean

}
