import { Rates } from "@app/interfaces/rates.interface";

export interface RatesResponse {
  base: string,
  date: string
  rates: Rates,
  success: boolean
  timestamp: number
}
