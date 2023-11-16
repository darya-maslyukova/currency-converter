import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { environment } from '@env/environment';
import {map, take, tap} from 'rxjs/operators';
import {LoadRates} from "@app/store/actions/rates.action";
import {httpParams} from "@shared/helpers/http-params";
import {RatesResponse} from "@app/interfaces/rates-response.interface";
import {RatesStateInterface} from "@app/interfaces/rates-state.interface";

export const ratesStateName = 'rates';

@State<RatesStateInterface>({
  name: ratesStateName,
  defaults: {
    date: '',
    rates: {
      USD: '',
      EUR: ''
    },
  },
})
@Injectable()
export class RatesState {

  @Selector()
  static rates(state: RatesResponse): any {
    return state.rates;
  }

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  @Action(LoadRates)
  loadRates(
    { patchState }: StateContext<RatesStateInterface>,
    action: LoadRates
  ): Observable<any> {

    // @ts-ignore
    return this.httpClient
      .get<RatesResponse>(environment.apiURL, {
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
          patchState(ratesResponse);
        })
      );
  }


}
