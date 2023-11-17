import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import { Store } from "@ngxs/store";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { ConverterItemComponent } from "@app/modules/home/components/converter-item/converter-item.component";
import { Currency } from "@app/enums/currency.enum";
import { ConvertCurrency } from "@app/store/actions/rates.action";
import { RatesConvertStateInterface } from "@app/interfaces/rates-convert-state.interface";

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ConverterItemComponent
  ],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@UntilDestroy()
export class ConverterComponent implements OnInit {

  convertForm: FormGroup;

  currencyFrom = Currency.UAH;
  currencyTo = Currency.USD;

  queryConvert = {
    from: Currency.UAH,
    to: Currency.USD,
    amount: 1000
  }

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {

    this.convertForm = this.fb.group({
      fromAmount: [null, [Validators.pattern(/^[0-9]\d*$/)]],
      toAmount: [null, [Validators.pattern(/^[0-9]\d*$/)]],
    })
  }

  ngOnInit() {
    this.convertForm.get('fromAmount')?.setValue(this.queryConvert.amount);
    this.changeCurrencyState('toAmount');
  }

  selectedCurrencyFrom(currencyFrom: string | Currency) {
    this.currencyFrom = currencyFrom  as Currency;
    this.queryConvert.from = currencyFrom as Currency;
    this.changeCurrencyState('toAmount');
  }

  selectedCurrencyTo(currencyTo: string) {
    this.currencyTo = currencyTo  as Currency;

    this.queryConvert = {
      amount: this.convertForm.get('toAmount')?.value,
      from: currencyTo as Currency,
      to: this.currencyFrom,
    };
    this.changeCurrencyState('fromAmount');
  }

  toCurrencyInput(event) {
    if(!event.target.validity.valid) {
      return;
    }

    this.queryConvert = {
      amount: event.target.value,
      from: this.currencyTo,
      to: this.currencyFrom,
    };
    this.changeCurrencyState('fromAmount');
  }

  fromCurrencyInput(event) {
    if(!event.target.validity.valid) {
      return;
    }

    this.queryConvert = {
      amount: event.target.value,
      from: this.currencyFrom,
      to: this.currencyTo,
    };
    this.changeCurrencyState('toAmount');
  }

  changeCurrencyState(controlName) {
    this.store
      .dispatch(new ConvertCurrency(this.queryConvert))
      .pipe(untilDestroyed(this))
      .subscribe((state: { converter: RatesConvertStateInterface }) => {
        this.convertForm.get(controlName)?.setValue(state.converter.homeConvert.result);
        this.cdr.markForCheck();
      });
  }


}
