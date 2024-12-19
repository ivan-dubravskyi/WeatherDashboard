import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import { WeatherService } from "../../core/services/weather.service";
import * as WeatherActions from './weather.actions';
import {mergeMap, combineLatest, of, map, catchError} from "rxjs";
import {WeatherApiService} from "../../core/services/weather-api.service";

@Injectable()
export class WeatherEffects {

  getCities$ = createEffect(() =>
  this.action$.pipe(
    ofType(WeatherActions.getCitiesWeather),
    mergeMap(() => {

      const storedCitiesNames = this.weatherService.loadCitiesFromLocalStorage();
      if (!storedCitiesNames.length) {
        return of(WeatherActions.getCitiesWeatherSuccess({cities: []}));
      }
      const requests  = storedCitiesNames.map(city => this.weatherService.getWeather(city))

      return combineLatest(requests).pipe(
        map((cities) => WeatherActions.getCitiesWeatherSuccess({ cities })),
        catchError((error) => of(WeatherActions.getCitiesWeatherError(error)))
      )
    })
  ))


  constructor(
    private action$: Actions,
    private weatherApiService: WeatherApiService,
    private weatherService: WeatherService,
  ) {}


}
