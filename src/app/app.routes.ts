import { Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';

export const APP_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent) },
  { path: '**', component: NotFoundComponent }
];
