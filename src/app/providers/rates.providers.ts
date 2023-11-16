import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import {LoadRatesOptions} from "@app/interfaces/load-rates-options.interface";
import {LoadRates} from "@app/store/actions/rates.action";
import {RatesState} from "@app/store/state/converter.state";
import {Rates} from "@app/interfaces/rates.interface";
import {RatesResponse} from "@app/interfaces/rates-response.interface";


export const RATES_LIST$ = new InjectionToken<Observable<Rates>>(
  'Rates list stream'
);

export const RATES_PROVIDERS: Provider[] = [
  {
    provide: RATES_LIST$,
    useFactory: ratesFactory,
    deps: [ ActivatedRoute, Store ],
  },
];

function ratesFactory(
  { queryParams } : ActivatedRoute,
  store: Store
): Observable<Rates> {
  return queryParams
    .pipe(
      switchMap(() => {
        const options: LoadRatesOptions = {
          from: 'UAH',
          to: 'USD,EUR'
        };

        store.dispatch(new LoadRates(options)).pipe(take(1)).subscribe();
        return store.select(RatesState.rates);
      })
    )

}
