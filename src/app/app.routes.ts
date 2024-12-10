import { Routes } from '@angular/router';
import {WeatherDashboardComponent} from "./weather-dashboard/weather-dashboard.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weather-dashboard',
  },
  {
    path: 'weather-dashboard',
    component: WeatherDashboardComponent,
  },
];
