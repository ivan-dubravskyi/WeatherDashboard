import {createAction, props} from "@ngrx/store";
import {CityWeather} from "../../core/models";
import {HttpErrorResponse} from "@angular/common/http";

export const getCitiesWeather = createAction('[Weather] Get Cities');
export const getCitiesWeatherSuccess = createAction(
  '[Weather] Get Cities Success',
  props<{ cities: CityWeather[] }>()
);
export const getCitiesWeatherError = createAction(
  '[Weather] Get Cities Error',
  props<{ error: HttpErrorResponse }>()
);
