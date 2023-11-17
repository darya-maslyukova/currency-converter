import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {Observable} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {RATES_LIST$, RATES_PROVIDERS} from "@app/providers/rates.providers";
import {RouterModule} from "@angular/router";
import {RatesResponse} from "@app/interfaces/rates-response.interface";
import {RatesConvertStateInterface} from "@app/interfaces/rates-convert-state.interface";
import {Rates} from "@app/interfaces/rates.interface";

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

@UntilDestroy()
export class HeaderComponent implements OnInit {

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(RATES_LIST$) readonly rates$: Observable<Rates>,
  ) {
  }

  ngOnInit() {
    // this.rates$
    //   .pipe(untilDestroyed(this))
    //   .subscribe(res  =>  {
    //     console.log('res', res)
    //     console.log(res)
    //     this.cdr.markForCheck();
    // })
  }
}
