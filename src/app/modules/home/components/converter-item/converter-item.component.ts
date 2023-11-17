import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";

import { Currency } from "@app/enums/currency.enum";

@Component({
  selector: 'app-converter-item',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './converter-item.component.html',
  styleUrls: ['./converter-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConverterItemComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConverterItemComponent implements OnInit, ControlValueAccessor {
  private onChange = (_value: string) => {};
  private onTouched = () => {};
  onDisabled = false;

  currencies = ['UAH', 'USD', 'EUR'];
  amountInputControl = new FormControl('');
  currencySelectControl = new FormControl('');

  @Input() currency: Currency;
  @Output() selectedCurrency: EventEmitter<string> = new EventEmitter<string>();

  private previousValue: string | undefined;

  set value(value){
    if( value !== undefined && this.previousValue !== value){
      this.previousValue = value;
      this.onChange(value);
    }
  }

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.currencySelectControl.setValue(this.currency);
  }

  writeValue(value: string): void {
    this.value = value;
    this.amountInputControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.onDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  changeCurrency(event) {
    this.selectedCurrency.emit(event.value);
  }
}
