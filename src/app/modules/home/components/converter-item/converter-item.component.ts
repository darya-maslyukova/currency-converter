import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, forwardRef,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {debounceTime} from "rxjs";

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

@UntilDestroy()
export class ConverterItemComponent implements OnInit, ControlValueAccessor {
  private onChange = (_value: string) => {};
  private onTouched = () => {};
  onDisabled = false;

  currencies = ['UAH', 'USD', 'EUR'];
  amountInputControl = new FormControl('');

  @Output() selectedCurrency: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  writeValue(value: string): void {
    console.log(value);
  }

  registerOnChange(fn: any): void {
    this.amountInputControl.valueChanges
      .pipe(debounceTime(300), untilDestroyed(this))
      .subscribe(value => {
        console.log(value);
        fn(value);
        this.cdr.markForCheck();
      });
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
    console.log('Currency', event.value);
    this.selectedCurrency.emit(event.value);
  }
}
