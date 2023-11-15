import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "@app/components/header/header.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'converter';
}
