export interface RatesConvertStateInterface {
  headerRates: {
    date: string,
    rates: {
      USD: string,
      EUR: string
    },
  },
  homeConvert: {
    date: string,
    result: string,
    query: {
      amount: number | string,
      from: string,
      to: string
    }
  }
}
