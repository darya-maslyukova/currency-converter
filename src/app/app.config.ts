import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter, RouterModule,
  withComponentInputBinding,
  withPreloading
} from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { IconsService } from "@app/services/icons.service";
import { APP_ROUTES } from "@app/app.routes";
import {AngularSvgIconModule} from "angular-svg-icon";
import {NgxsModule} from "@ngxs/store";
import {RatesState} from "@app/store/state/converter.state";
import {RATES_PROVIDERS} from "@app/providers/rates.providers";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      AngularSvgIconModule.forRoot(),
      NgxsModule.forRoot(
        [
          RatesState
        ]),
    ),
    RATES_PROVIDERS,
    provideAnimations(), // required animations providers
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      deps: [IconsService],
      multi: true
    },
    {provide: 'API_BASE_URL', useFactory: baseUrl},
    {provide: 'LOCALSTORAGE', useFactory: getLocalStorage},
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration()
  ]
};

export function appInitFactory(is: IconsService): Function {
  return () => Promise.all([
    is.loadSvgIcons(),
  ]);
}

// Adapter for window.localStorage
export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

export function baseUrl(): string {
  return window.location.origin + '/api';
}
