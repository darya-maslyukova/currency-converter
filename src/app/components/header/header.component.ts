import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { Observable } from "rxjs";

import { RATES_LIST$ } from "@app/providers/rates.providers";
import { RouterModule } from "@angular/router";
import { RatesResponse } from "@app/interfaces/rates-response.interface";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent {

  constructor(
    @Inject(RATES_LIST$) readonly ratesResponse$: Observable<RatesResponse>,
  ) {
  }
}
