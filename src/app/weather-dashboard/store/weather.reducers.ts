import { WeatherState } from "../../core/models";
import { createReducer, on } from "@ngrx/store";
import * as WeatherActions from './weather.actions';

export const initialState: WeatherState = {
  isLoading: false,
  cities: [],
  error: null,
}

export const weatherReducers = createReducer(
  initialState,
  on(WeatherActions.getCitiesWeather, (state) => ({ ...state, isLoading: true })),
  on(WeatherActions.getCitiesWeatherSuccess, (state, {cities}) => ({
    ...state,
    isLoading: false,
    cities,
  })),
  on(WeatherActions.getCitiesWeatherError, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
)
