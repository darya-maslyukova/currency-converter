import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ConvertCurrency, LoadRates } from "@app/store/actions/rates.action";
import { httpParams } from "@shared/helpers/http-params";
import { RatesResponse } from "@app/interfaces/rates-response.interface";
import { RatesConvertStateInterface } from "@app/interfaces/rates-convert-state.interface";
import { ConvertStateInterface } from "@app/interfaces/convert-state.interface";
import { ConvertResponse } from "@app/interfaces/convert-response.interface";
import { RatesStateInterface } from "@app/interfaces/rates-state.interface";

export const converterStateName = 'converter';

@State<RatesConvertStateInterface>({
  name: converterStateName,
  defaults: {
    headerRates: {
      date: '',
      rates: {
        USD: '',
        EUR: ''
      },
    },
    homeConvert: {
      date: '',
      result: '',
      query: {
        amount: 0,
        from: '',
        to: ''
      }
    }
  },
})
@Injectable()
export class RatesState {

  @Selector()
  static rates(state: RatesConvertStateInterface): any {
    return state.headerRates;
  }

  @Selector()
  static convert(state: RatesConvertStateInterface): any {
    return state.homeConvert;
  }

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  @Action(LoadRates)
  loadRates(
    { patchState }: StateContext<RatesConvertStateInterface>,
    action: LoadRates
  ): Observable<RatesStateInterface> {

    return this.httpClient
      .get<RatesResponse>(`${environment.apiURL}/latest`, {
        params: httpParams(action.options),
        headers: {
          'X-RapidAPI-Key': environment.rapidAPIkey,
          'X-RapidAPI-Host': environment.rapidAPIHost
        } })
      .pipe(
        map(ratesResponse => {

            return  {
              date: ratesResponse.date,
              rates: {
                EUR: (ratesResponse.rates.UAH as number).toFixed(2),
                USD: ((ratesResponse.rates.UAH as number)/(ratesResponse.rates.USD as number)).toFixed(2),
              },
            }
        }),
        tap(ratesResponse => {
          patchState({
            headerRates:  ratesResponse
          });
        })
      );
  }

  @Action(ConvertCurrency)
  convertCurrency(
    { patchState }: StateContext<RatesConvertStateInterface>,
    action: ConvertCurrency
  ): Observable<ConvertStateInterface> {
    return this.httpClient
      .get<ConvertResponse>(`${environment.apiURL}/convert`, {
        params: httpParams(action.options),
        headers: {
          'X-RapidAPI-Key': environment.rapidAPIkey,
          'X-RapidAPI-Host': environment.rapidAPIHost
        } })
      .pipe(
        map(convertResponse => {

          return  {
            date: convertResponse.date,
            query: {
              amount: convertResponse.query.amount as string,
              from: convertResponse.query.from,
              to: convertResponse.query.to,
            },
            result: (convertResponse.result).toFixed(2)
          }
        }),
        tap(convertResponse => {
          patchState({
            homeConvert: convertResponse
          });
        })
      );
  }


}
