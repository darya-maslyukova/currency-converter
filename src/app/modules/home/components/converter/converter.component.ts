import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConverterItemComponent} from "@app/modules/home/components/converter-item/converter-item.component";

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
export class ConverterComponent implements OnInit {

  convertForm: FormGroup;


  constructor(
    private fb: FormBuilder,
  ) {

    this.convertForm = this.fb.group({
      // fromCurrency: [null],
      fromAmount: [null],
      // toCurrency: [null],
      toAmount: [null],
    })
  }

  ngOnInit() {

  }

  convert(event) {
    console.log('Converter event', event)
  }

}
