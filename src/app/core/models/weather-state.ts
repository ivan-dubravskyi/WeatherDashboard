import {CityWeather} from "./city-weather";
import {HttpErrorResponse} from "@angular/common/http";

export interface WeatherState {
  isLoading: boolean;
  cities: CityWeather[];
  error: HttpErrorResponse | null;
}
