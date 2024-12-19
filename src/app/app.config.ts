import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from "@ngrx/store";
import { weatherReducers } from "./weather-dashboard/store/weather.reducers";
import { provideEffects } from "@ngrx/effects";
import { WeatherEffects } from "./weather-dashboard/store/weather.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({weather: weatherReducers}),
    provideEffects(WeatherEffects)
  ]
};
