import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConverterComponent } from "@app/modules/home/components/converter/converter.component";
import {Store} from "@ngxs/store";
import {ConvertCurrency} from "@app/store/actions/rates.action";
import {Currency} from "@app/enums/currency.enum";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ConverterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent  implements OnInit {

  constructor(
    private store: Store
  ) {
  }

  ngOnInit() {

  }

}
