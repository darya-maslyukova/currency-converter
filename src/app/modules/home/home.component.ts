import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConverterComponent } from "@app/modules/home/components/converter/converter.component";

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
export class HomeComponent {

}
