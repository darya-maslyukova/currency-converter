import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RATES_LIST$} from "@app/providers/rates.providers";
import {Observable} from "rxjs";
import {Rates} from "@app/interfaces/rates.interface";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent  implements OnInit {

  constructor(
    @Inject(RATES_LIST$) readonly rates$: Observable<Rates>
  ) {
  }

  ngOnInit() {
  }

}
